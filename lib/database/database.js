// @ts-check
import fs from 'fs'
import path from 'path'
import { jidNormalizedUser } from '@whiskeysockets/baileys'
import sanitizeFile from 'sanitize-filename'

/**
 * @template T
 */
export class Database {
    /**
     * @abstract
     * @param {string} key 
     * @returns {Promise<T | null>}
     */
    async get(key) {
        throw new Error('Method not implemented.')
    }

    /**
     * Use `get` instead of `_get`
     * @summary This function runs outside the mutex, and may cause a race condition
     * @abstract
     * @param {string} key 
     * @returns {Promise<T | null>}
    */
    async _get(key) {
        throw new Error('Method not implemented.')
    }

    /**
     * @abstract
     * @param {string} key 
     * @param {Object | T} data 
     * @param {boolean} [ifAbsent]
     * @returns {Promise<boolean>}
     */
    insert(key, data, ifAbsent) {
        throw new Error('Method not implemented.')
    }

    /**
     * @abstract
     * @param {string} key 
     * @param {Object | T} data 
     * @param {boolean} [insertIfAbsent]
     * @returns {Promise<boolean>}
     */
    update(key, data, insertIfAbsent) {
        throw new Error('Method not implemented.')
    }

    /** @type {string} */
    folder

    /**
     * @param {string} folder 
     */
    constructor(folder) {
        this.folder = folder
        this.initializeFolder()
    }
    initializeFolder() {
        if (fs.existsSync(this.folder)) return
        fs.mkdirSync(this.folder, { recursive: true })
    }

    /**
     * @param {string} filename 
     * @returns {Promise<object|null>}
     */
    async read(filename) {
        const file = this._getFilePath(filename)
        if (!this.has(filename)) return null
        const str = await fs.promises.readFile(file, 'utf-8')
        if (!str) return null
        try {
            return JSON.parse(str)
        } catch (e) {
            console.error(filename, e)
            // delete if file is corrupted
            // await fs.promises.unlink(file)
            return null
        }
    }

    /**
     * @param {string} filename 
     * @returns {object|null}
     */
    readSync(filename) {
        const file = this._getFilePath(filename)
        if (!this.has(filename)) return null
        const str = fs.readFileSync(file, 'utf-8')
        if (!str) return null
        try {
            return JSON.parse(str)
        } catch (e) {
            console.error(filename, e)
            // delete if file is corrupted
            // fs.unlinkSync(file)
            return null
        }
    }

    /**
     * @param {string} filename 
     * @param {object} obj 
     */
    async save(filename, obj) {
        const file = this._getFilePath(filename)
        const str = JSON.stringify(obj)
        await fs.promises.writeFile(file, str, 'utf-8')
    }

    /**
     * @param {string} filename 
     * @param {object} obj 
     */
    saveSync(filename, obj) {
        const file = this._getFilePath(filename)
        const str = JSON.stringify(obj)
        fs.writeFileSync(file, str, 'utf-8')
    }

    async keys() {
        return await fs.promises.readdir(this.folder)
    }

    keysSync() {
        return fs.readdirSync(this.folder)
    }

    /**
     * Check if spesific filename is exist in data folder.
     * This function can't check any data in file is correct (not corrupted) or not
     * @param {string} key 
     * @param {{ 
     *  normalize?: boolean | undefined; 
     *  sanitize?: boolean | undefined; 
     * }} [opts={}]
     */
    has(
        key,
        opts = {}
    ) {
        if (opts.normalize) key = jidNormalizedUser(key)
        if (opts.sanitize) key = sanitizeFile(key)
        const file = this._getFilePath(key)
        return fs.existsSync(file)
    }

    /**
     * @param {string} filename 
     */
    _getFilePath(filename) {
        if (!/\.json$/.test(filename))
            filename += '.json'
        return path.join(this.folder, filename)
    }
}

/**
 * @template T 
 */
export class data {

    /** @type {Readonly<string>} */
    _filename
    /** @type {Readonly<Database<T>} */
    _db
    constructor(
        _filename,
        _db,
    ) {
        this._filename = _filename
        this._db = _db
    }
    /**
     * @abstract 
     * @param {object} obj 
     */
    create(obj) {
        throw new Error('Method not implemented.')
    }
    /**
    * @abstract 
    * @returns {Promise<T>}
    */
    async verify() {
        throw new Error('Method not implemented.')
    }
    /**
     * Prefer to use `verify` instead of `verifySync`
     * @abstract
     * @returns {T}
     */
    verifySync() {
        throw new Error('Method not implemented.')
    }
    /**
     * @abstract 
     */
    async save() {
        throw new Error('Method not implemented.')
    }
    /**
     * Use `save` instead of `_save`
     * @summary This function runs outside the mutex, and may cause a race condition
     * @abstract
     */
    async _save() {
        throw new Error('Method not implemented.')
    }
    /**
     * Prefer to use `save` instead of `saveSync`
     * @abstract
     */
    saveSync() {
        throw new Error('Method not implemented.')
    }
}