/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fs from 'fs/promises';
import { z } from 'zod';
import { Database, data } from './database.js';
import { logger } from '../connection.js';
import DBKeyedMutex, { ActionType } from './mutex.js';
import { jidNormalizedUser } from '@whiskeysockets/baileys';
import sanitizeFile from 'sanitize-filename';
import NodeCache from 'node-cache';

const usersMutex = new DBKeyedMutex(logger.child({ mutex: 'db-users' }))
const usersCache = new NodeCache({
    stdTTL: 2 * 60,
    checkperiod: 3 * 60,
    useClones: false
})

/**
 * @typedef {z.infer<typeof UserData._schema>} UserSchema
 */

/**
 * @class
 * @extends {data<UserSchema>}
 */
export class UserData extends data {

    static _schema = z.object({
		// String is here
		role: z.string().default('-'),
        afkReason: z.string().default(''),
        
        nama: z.string().default('-'),
        umur: z.string().default('-'),
        gender: z.string().default('non-binary'),
        crush: z.string().default('-'),
        partner: z.string().default('-'),
        waifu: z.string().default('-'),
        husbu: z.string().default('-'),
        job: z.string().default('-'),
        skill: z.string().default('-'),
        misi: z.string().default(''),
        title: z.string().default(''),
        location: z.string().default("gubuk"),
        
		// Boolean is here
		banned: z.boolean().default(false),
		jail: z.boolean().default(false),
		settransfer: z.boolean().default(true),
        statustransfer: z.boolean().default(false),
        questselesai: z.boolean().default(false),
        safezone: z.boolean().default(false),
        silent: z.boolean().default(false),
        
		// Number is here
		level: z.number().min(0).default(0),
        limit: z.number().min(0).default(100),
        exp: z.number().min(0).default(0),
        money: z.number().min(0).default(0),
        potion: z.number().min(0).default(0),
        medkit: z.number().min(0).default(0),
        social: z.number().default(0),
        gems: z.number().min(0).default(0),
        click: z.number().min(0).default(0),
        token: z.number().min(0).default(0),
        luck: z.number().min(0).default(0),
        
        afk: z.number().default(-1),
        warn: z.number().min(0).default(0),
        followers: z.number().min(0).default(0),
        kepercayaanwaifu: z.number().min(0).default(10),
        kepercayaanhusbu: z.number().min(0).default(10),
        jobexp: z.number().min(0).default(0),
        
        quest: z.number().min(0).default(0),
        quest_previous: z.number().min(0).default(0),
        quest_point: z.number().min(0).default(0),
        steal: z.number().min(0).default(0),
        
        maxcrate: z.number().min(0).default(1),
        uncommon: z.number().min(0).default(0),
        common: z.number().min(0).default(0),
        rare: z.number().min(0).default(0),
        mythical: z.number().min(0).default(0),
        legendary: z.number().min(0).default(0),
        ancient: z.number().min(0).default(0),
        pet: z.number().min(0).default(0),
        
        burger: z.number().min(0).default(0),
        pizza: z.number().min(0).default(0),
        kentang: z.number().min(0).default(0),
        
        health: z.number().default(200),
        death: z.number().min(0).default(0),
        lockpick: z.number().min(0).default(0),
        lock: z.number().min(0).default(0),
        balancer: z.number().min(0).default(0),
        crowbar: z.number().min(0).default(0),
        
        strength: z.number().min(0).default(1),
        strength_multiplier: z.number().min(0).default(1),
        strength_multiplier_extra: z.number().min(0).default(1),
        psychic: z.number().min(0).default(1),
        psychic_multiplier: z.number().min(0).default(1),
        psychic_multiplier_extra: z.number().min(0).default(1),
        defense: z.number().min(0).default(1),
        defense_multiplier: z.number().min(0).default(1),
        defense_multiplier_extra: z.number().min(0).default(1),
        speed: z.number().min(0).default(1),
        speed_multiplier: z.number().min(0).default(1),
        speed_multiplier_extra: z.number().min(0).default(1),
        protection: z.number().min(0).default(1),
        
        bannedExpired: z.number().default(-1),
        jailExpired: z.number().default(-1),
        
        trash: z.number().min(0).default(0),
        wood: z.number().min(0).default(0),
        rock: z.number().min(0).default(0),
        string: z.number().min(0).default(0),
        
        telephone: z.number().min(0).default(0),
        smartphone: z.number().min(0).default(0),
        
        ant: z.number().min(0).default(0),
        antexp: z.number().min(0).default(0),
        horse: z.number().min(0).default(0),
        horseexp: z.number().min(0).default(0),
        cat: z.number().min(0).default(0),
        catexp: z.number().min(0).default(0),
        fox: z.number().min(0).default(0),
        foxexp: z.number().min(0).default(0),
        dog: z.number().min(0).default(0),
        dogexp: z.number().min(0).default(0),
        dragon: z.number().min(0).default(0),
        dragonexp: z.number().min(0).default(0),
        panda: z.number().min(0).default(0),
        pandaexp: z.number().min(0).default(0),

        antlastfeed: z.number().min(0).default(0),
        horselastfeed: z.number().min(0).default(0),
        catlastfeed: z.number().min(0).default(0),
        foxlastfeed: z.number().min(0).default(0),
        doglastfeed: z.number().min(0).default(0),
        dragonlastfeed: z.number().min(0).default(0),
        pandalastfeed: z.number().min(0).default(0),
        petFood: z.number().min(0).default(0),
        
        chest: z.number().min(0).default(0),
        auricore: z.number().min(0).default(0),
        elixir: z.number().min(0).default(0),
        sphere: z.number().min(0).default(0),
        emerald: z.number().min(0).default(0),
        diamond: z.number().min(0).default(0),
        orb: z.number().min(0).default(0),
        keping: z.number().min(0).default(0),
        crypto: z.number().min(0).default(0),
        crystal: z.number().min(0).default(0),
        gold: z.number().min(0).default(0),
        iron: z.number().min(0).default(0),
        ducky: z.number().min(0).default(0),

        ironore: z.number().min(0).nullish().default(0),
        goldore: z.number().min(0).nullish().default(0),
        diamondore: z.number().min(0).nullish().default(0),
        ancientdebris: z.number().min(0).nullish().default(0),
        
        car: z.number().min(0).default(0),
        fuel: z.number().min(0).default(0),
        
        armor: z.number().min(0).default(0),
        armordurability: z.number().min(0).default(0),
        sword: z.number().min(0).default(0),
        sworddurability: z.number().min(0).default(0),
        pickaxe: z.number().min(0).default(0),
        pickaxedurability: z.number().min(0).default(0),
        fishingrod: z.number().min(0).default(0),
        fishingroddurability: z.number().min(0).default(0),
        
        tombak: z.number().min(0).default(0),
        busur: z.number().min(0).default(0),
        anakpanah: z.number().min(0).default(0),
        ammo: z.number().min(0).default(0),
        glock: z.number().min(0).default(0),
        ak47: z.number().min(0).default(0),
        m4: z.number().min(0).default(0),
        m16: z.number().min(0).default(0),
        ar15: z.number().min(0).default(0),
        scar: z.number().min(0).default(0),
        famas: z.number().min(0).default(0),
        aug: z.number().min(0).default(0),
        uzi: z.number().min(0).default(0),
        mp5: z.number().min(0).default(0),
        p90: z.number().min(0).default(0),
        mac10: z.number().min(0).default(0),
        vector: z.number().min(0).default(0),
        barrettm82: z.number().min(0).default(0),
        remington700: z.number().min(0).default(0),
        dragunovsvd: z.number().min(0).default(0),
        m40: z.number().min(0).default(0),
        m24: z.number().min(0).default(0),
        
        elang: z.number().min(0).default(0),
        beruang: z.number().min(0).default(0),
        harimau: z.number().min(0).default(0),
        buaya: z.number().min(0).default(0),
        bebek: z.number().min(0).default(0),
        ayam: z.number().min(0).default(0),
        koala: z.number().min(0).default(0),
        zebra: z.number().min(0).default(0),
        sapi: z.number().min(0).default(0),
        babi: z.number().min(0).default(0),
        banteng: z.number().min(0).default(0),
        kerbau: z.number().min(0).default(0),
        kelinci: z.number().min(0).default(0),
        tupai: z.number().min(0).default(0),
        serigala: z.number().min(0).default(0),
        domba: z.number().min(0).default(0),
        kelelawar: z.number().min(0).default(0),
        landak: z.number().min(0).default(0),
        kangguru: z.number().min(0).default(0),
        trenggiling: z.number().min(0).default(0),
        badak: z.number().min(0).default(0),
        gajah: z.number().min(0).default(0),
        
        // Array
        following: z.array(z.string()).default([]),
        
        // Timer
        lastcommand: z.number().min(0).default(0),
        lastclaim: z.number().min(0).default(0),
        lasthourly: z.number().min(0).default(0),
        lastdaily: z.number().min(0).default(0),
        lastweekly: z.number().min(0).default(0),
        lastmonthly: z.number().min(0).default(0),
        lastadventure: z.number().min(0).default(0),
        lastkencan: z.number().min(0).default(0),
        lastkencani: z.number().min(0).default(0),
        lastkerja: z.number().min(0).default(0),
        lastngojek: z.number().min(0).default(0),
        lasttransfer: z.number().min(0).default(0),
        lastkill: z.number().min(0).default(0),
        lastnetworking: z.number().min(0).default(0),
        lastmisi: z.number().min(0).default(0),
        lastgo: z.number().min(0).default(0),
        lastslot: z.number().min(0).default(0),
        lasttrading: z.number().min(0).default(0),
        laststeal: z.number().min(0).default(0),
        lastsafezone: z.number().min(0).default(0),
        lasttoken: z.number().min(0).default(0),
        lastpunch: z.number().min(0).default(0),
        lasttrain: z.number().min(0).default(0),
        lastpsychic: z.number().min(0).default(0),
        lastrun: z.number().min(0).default(0),
        lastluck: z.number().min(0).default(0),
        lastsmith: z.number().min(0).default(0),
        lastopen: z.number().min(0).default(0),
        lastmining: z.number().min(0).default(0),
        lastberburu: z.number().min(0).default(0),
        lastmancing: z.number().min(0).default(0),
        lastclick: z.number().min(0).default(0),
        lasteat: z.number().min(0).default(+new Date() + 7 * 24 * 60 * 60 * 1000),
    })


    // String is here
    role = '-'
    afkReason = ''
    
    nama = '-'
    umur = '-'
    gender = 'non-binary'
    crush = '-'
    partner = '-'
    waifu = '-'
    husbu = '-'
    job = '-'
    skill = '-'
    misi = ''
    title = ''
    location = 'gubuk'
    
    // Boolean is here
    banned = false
    jail = false
    settransfer = true
    statustransfer = false
    questselesai = false
    safezone = false
    silent = false
    
    // Number is here
    level = 0
    limit = 100
    exp = 0
    money = 0
    potion = 0
    medkit = 0
    social = 0
    gems = 0
    click = 0
    token = 0
    luck = 0
    
    afk = -1
    warn = 0
    followers = 0
    kepercayaanwaifu = 10
    kepercayaanhusbu = 10
    jobexp = 0
    
    quest = 0
    quest_previous = 0
    quest_point = 0
    steal = 0
    
    maxcrate = 1
    uncommon = 0
    common = 0
    rare = 0
    mythical = 0
    legendary = 0
    ancient = 0
    pet = 0
    
    burger = 0
    pizza = 0
    kentang = 0
    
    health = 200
    death = 0
    lockpick = 0
    lock = 0
    balancer = 0
    crowbar = 0
    
    strength = 1
    strength_multiplier = 1
    strength_multiplier_extra = 1
    psychic = 1
    psychic_multiplier = 1
    psychic_multiplier_extra = 1
    defense = 1
    defense_multiplier = 1
    defense_multiplier_extra = 1
    speed = 1
    speed_multiplier = 1
    speed_multiplier_extra = 1
    protection = 1
    
    bannedExpired = -1
    jailExpired = -1
    
    trash = 0
    wood = 0
    rock = 0
    string = 0
    
    telephone = 0
    smartphone = 0
    
    ant = 0
    antexp = 0
    horse = 0
    horseexp = 0
    cat = 0
    catexp = 0
    fox = 0
    foxexp = 0
    dog = 0
    dogexp = 0
    dragon = 0
    dragonexp = 0
    panda = 0
    pandaexp = 0

    antlastfeed = 0
    horselastfeed = 0
    catlastfeed = 0
    foxlastfeed = 0
    doglastfeed = 0
    dragonlastfeed = 0
    pandalastfeed = 0
    petFood = 0
    
    chest = 0
    auricore = 0
    elixir = 0
    sphere = 0
    emerald = 0
    diamond = 0
    orb = 0
    keping = 0
    crypto = 0
    crystal = 0
    gold = 0
    iron = 0
    ducky = 0
    
    ironore = 0
    goldore = 0
    diamondore = 0
    ancientdebris = 0
    
    car = 0
    fuel = 0
    
    armor = 0
    armordurability = 0
    sword = 0
    sworddurability = 0
    pickaxe = 0
    pickaxedurability = 0
    fishingrod = 0
    fishingroddurability = 0
    
    tombak = 0
    busur = 0
    anakpanah = 0
    ammo = 0
    glock = 0
    ak47 = 0
    m4 = 0
    m16 = 0
    ar15 = 0
    scar = 0
    famas = 0
    aug = 0
    uzi = 0
    mp5 = 0
    p90 = 0
    mac10 = 0
    vector = 0
    barrettm82 = 0
    remington700 = 0
    dragunovsvd = 0
    m40 = 0
    m24 = 0
    
    elang = 0
    beruang = 0
    harimau = 0
    buaya = 0
    bebek = 0
    ayam = 0
    koala = 0
    zebra = 0
    sapi = 0
    babi = 0
    banteng = 0
    kerbau = 0
    kelinci = 0
    tupai = 0
    serigala = 0
    domba = 0
    kelelawar = 0
    landak = 0
    kangguru = 0
    trenggiling = 0
    badak = 0
    gajah = 0
    
    // Array
    following = []
    
    // Timer
    lastcommand = 0
    lastclaim = 0
    lasthourly = 0
    lastdaily = 0
    lastweekly = 0
    lastmonthly = 0
    lastadventure = 0
    lastkencan = 0
    lastkencani = 0
    lastkerja = 0
    lastngojek = 0
    lasttransfer = 0
    lastkill = 0
    lastnetworking = 0
    lastmisi = 0
    lastgo = 0
    lastslot = 0
    lasttrading = 0
    laststeal = 0
    lastsafezone = 0
    lasttoken = 0
    lastpunch = 0
    lasttrain = 0
    lastpsychic = 0
    lastrun = 0
    lastluck = 0
    lastsmith = 0
    lastopen = 0
    lastmining = 0
    lastberburu = 0
    lastmancing = 0
    lastclick = 0
    lasteat = +new Date() + 7 * 24 * 60 * 60 * 1000


    /**
     * 
     * @param {string} file 
     * @param {UsersDatabase} db 
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
        const data = UserData._schema.nullish().parse(obj) || {}
        for (const key in data) {
            if (data == undefined) continue
            if (!(key in this))
                console.warn(`Property ${key} doesn't exist in '${UserData.name}', but trying to insert with ${data}`)
            // @ts-ignore
            this[key] = data[key]
        }
    }
    verify() {
        return UserData._schema.parseAsync(this)
    }

    verifySync() {
        return UserData._schema.parse(this)
    }

    save() {
        return usersMutex.mutex(this._filename, ActionType.WRITE, this._save.bind(this))
    }
    async _save() {
        const id = this._filename
        const data = await this.verify()
        await this._db.save(id, data)
        usersCache.set(id, data)
    }

    saveSync() {
        this._db.saveSync(this._filename, this.verifySync())
    }
}

/**
 * @class
 * @extends {Database<UserData>}
 */
export class UsersDatabase extends Database {
    /**
     * @param {string} [folder]
     */
    constructor(folder = './databases/users') {
        super(folder)
    }

    /**
     * @param {string} jid 
     * @param {Object | UserData | ((user: UserData) => void | Promise<void>)} data 
     * @returns 
     */
    update(jid, data) {
        const filename = sanitizeFile(jidNormalizedUser(jid))
        return usersMutex.mutex(filename, ActionType.READ | ActionType.WRITE, async () => {
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

    async delete(user) {
        const filename = sanitizeFile(jidNormalizedUser(user));
        return usersMutex.mutex(filename, ActionType.WRITE, async () => {
            try {
                await fs.unlink(`./database/users/${filename}.json`);
                usersCache.del(filename);
                return true;
            } catch (error) {
                console.error(`Gagal menghapus data pengguna ${user}:`, error);
                return true;
            }
        });
    }
    
    /**
     * @param {string} user 
     * @returns {Promise<UserData>}
     */
    get(user) {
        const filename = sanitizeFile(jidNormalizedUser(user))
        return usersMutex.mutex(filename, ActionType.READ, this._get.bind(this, filename))
    }

    /**
     * @param {string} filename 
     * @returns {Promise<UserData>}
     */
    async _get(filename) {
        const user = new UserData(filename, this)
        /** @type {UserSchema | undefined} */
        const cache = usersCache.get(filename)
        user.create(cache ?? await this.read(filename))
        usersCache.set(filename, await user.verify())
        return user
    }
}