// @ts-check
import { z } from 'zod'
import { Database, data } from './database.js'
import { logger } from '../connection.js'
import DBKeyedMutex, { ActionType } from './mutex.js'
import { jidNormalizedUser } from '@whiskeysockets/baileys'
import sanitizeFile from 'sanitize-filename'
import NodeCache from 'node-cache'

const settingsMutex = new DBKeyedMutex(logger.child({ mutex: 'db-users' }))
const settingsCache = new NodeCache({
    stdTTL: 2 * 60,
    checkperiod: 3 * 60,
    useClones: false
})

/**
 * @typedef {z.infer<typeof SettingData._schema>} SettingSchema
 */

/**
 * @class
 * @extends {data<SettingSchema>}
 */
export class SettingData extends data {

    static _schema = z.object({
        self: z.boolean().default(false),
        restrict: z.boolean().default(true),
        autoread: z.boolean().default(true)
    })

    self = false
    restrict = true
    autoread = true

    /**
     * 
     * @param {string} file 
     * @param {SettingsDatabase} db 
     * @param {object|undefined|null} [obj]
     */
    constructor(file, db, obj) {
        super(file, db)
        this.create(obj)
    }
    /**
     * 
     * @param {object|undefined|null} [obj]
     * @param {boolean} [skipChecking=false]
     */
    create(obj, skipChecking = false) {
        const data = SettingData._schema.nullish().parse(obj) || {}
        for (const key in data) {
            if (data == undefined) continue
            if (!(key in this))
                console.warn(`Property ${key} doesn't exist in '${SettingData.name}', but trying to insert with ${data}`)
            // @ts-ignore
            this[key] = data[key]
        }
    }
    verify() {
        return SettingData._schema.parseAsync(this)
    }

    verifySync() {
        return SettingData._schema.parse(this)
    }

    save() {
        return settingsMutex.mutex(this._filename, ActionType.WRITE, this._save.bind(this))
    }
    async _save() {
        const id = this._filename
        const data = await this.verify()
        await this._db.save(id, data)
        settingsCache.set(id, data)
    }

    saveSync() {
        this._db.saveSync(this._filename, this.verifySync())
    }
}

/**
 * @class
 * @extends {Database<SettingData>}
 */
export class SettingsDatabase extends Database {
    /**
     * @param {string} [folder]
     */
    constructor(folder = './databases/settings') {
        super(folder)
    }

    /**
     * @param {string} jid 
     * @param {Object | SettingData | ((user: SettingData) => void | Promise<void>)} data 
     * @returns 
     */
    update(jid, data) {
        const filename = sanitizeFile(jidNormalizedUser(jid))
        return settingsMutex.mutex(filename, ActionType.READ | ActionType.WRITE, async () => {
            const user = await this._get(filename)
            if (typeof data === 'function') {
                await data(user)
            } else {
                user.create(data)
            }
            await user._save()
            return true
        })
    }

    /**
     * @param {string} user 
     * @returns {Promise<SettingData>}
     */
    get(user) {
        const filename = sanitizeFile(jidNormalizedUser(user))
        return settingsMutex.mutex(filename, ActionType.READ, this._get.bind(this, filename))
    }

    /**
     * @param {string} filename 
     * @returns {Promise<SettingData>}
     */
    async _get(filename) {
        const user = new SettingData(filename, this)
        /** @type {SettingSchema | undefined} */
        const cache = settingsCache.get(filename)
        user.create(cache ?? await this.read(filename))
        settingsCache.set(filename, await user.verify())
        return user
    }
}