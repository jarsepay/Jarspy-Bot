// @ts-check
import { z } from 'zod'
import { Database, data } from './database.js'
import { logger } from '../connection.js'
import DBKeyedMutex, { ActionType } from './mutex.js'
import { jidNormalizedUser } from '@whiskeysockets/baileys'
import sanitizeFile from 'sanitize-filename'
import NodeCache from 'node-cache'

const chatsMutex = new DBKeyedMutex(logger.child({ mutex: 'db-chats' }))
const chatsCache = new NodeCache({
    stdTTL: 2 * 60,
    checkperiod: 3 * 60,
    useClones: false
})

/**
 * @typedef {z.infer<typeof ChatData._schema>} ChatSchema
 */
/**
 * @class
 * @extends {data<ChatSchema>}
 */
export class ChatData extends data {
    static _schema = z.object({
        banned: z.boolean().default(false),
        welcome: z.boolean().default(false),
        detect: z.boolean().default(false),
        sWelcome: z.string().default(''),
        sBye: z.string().default(''),
        sPromote: z.string().default(''),
        sDemote: z.string().default(''),
        delete: z.boolean().default(true),
        antiLink: z.boolean().default(false),
        viewonce: z.boolean().default(false),
        antiToxic: z.boolean().default(true),
        expired: z.number().default(0),
    })

    banned = false
    welcome = false
    detect = false
    sWelcome = ''
    sBye = ''
    sPromote = ''
    sDemote = ''
    delete = true
    antiLink = false
    viewonce = false
    antiToxic = true
    expired = 0

    /**
     * 
     * @param {string} file 
     * @param {ChatsDatabase} db 
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
        const data = ChatData._schema.nullish().parse(obj) || {}
        for (const key in data) {
            if (data == undefined) continue
            if (!(key in this))
                console.warn(`Property ${key} doesn't exist in '${ChatData.name}', but trying to insert with ${data}`)
            // @ts-ignore
            this[key] = data[key]
        }
    }
    verify() {
        return ChatData._schema.parseAsync(this)
    }

    verifySync() {
        return ChatData._schema.parse(this)
    }

    save() {
        return chatsMutex.mutex(this._filename, ActionType.WRITE, this._save.bind(this))
    }
    async _save() {
        const id = this._filename
        const data = await this.verify()
        await this._db.save(id, data)
        chatsCache.set(id, data)
    }

    saveSync() {
        this._db.saveSync(this._filename, this.verifySync())
    }
}

/**
 * @class
 * @extends {Database<ChatData>}
 */
export class ChatsDatabase extends Database {
    /**
     * @param {string} [folder]
     */
    constructor(folder = './databases/chats') {
        super(folder)
    }

    /**
     * @param {string} jid 
     * @param {object | ChatData | ((chat: ChatData) => void | Promise<void>)} data 
     * @returns 
     */
    update(jid, data) {
        const filename = sanitizeFile(jidNormalizedUser(jid))
        return chatsMutex.mutex(
            filename,
            ActionType.READ | ActionType.WRITE,
            async () => {
                const chat = await this._get(filename)
                if (typeof data === 'function') {
                    await data(chat)
                } else {
                    chat.create(data)
                }
                await chat._save()
                return true
            }
        )
    }

    /**
     * @param {string} jid 
     * @returns {Promise<ChatData>}
     */
    get(jid) {
        const filename = sanitizeFile(jidNormalizedUser(jid))
        return chatsMutex.mutex(filename, ActionType.READ, this._get.bind(this, filename))
    }
    /**
     * @param {string} filename 
     * @returns {Promise<ChatData>}
     */
    async _get(filename) {
        const chat = new ChatData(filename, this)
        /** @type {ChatSchema | undefined} */
        const cache = chatsCache.get(filename)
        chat.create(cache ?? await this.read(filename))
        chatsCache.set(filename, await chat.verify())
        return chat
    }
}