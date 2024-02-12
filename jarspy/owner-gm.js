/*
  • Simple Cheat Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

const items = {
    gm: {
        level: {
            exp: 0
        },
        exp: {
            exp: 0
        },
        social: {
            exp: 0
        },
        money: {
            exp: 0
        },
        potion: {
            exp: 0
        },
        burger: {
            exp: 0
        },
        pizza: {
            exp: 0
        },
        kentang: {
            exp: 0
        },
        maxcrate: {
            exp: 0
        },
        uncommon: {
            exp: 0
        },
        common: {
            exp: 0
        },
        rare: {
            exp: 0
        },
        mythical: {
            exp: 0
        },
        legendary: {
            exp: 0
        },
        ancient: {
            exp: 0
        },
        pet: {
            exp: 0
        },
        kepercayaanwaifu: {
            exp: 0
        },
        kepercayaanhusbu: {
            exp: 0
        },
        strength: {
            exp: 0
        },
        psychic: {
            exp: 0
        },
        defense: {
            exp: 0
        },
        speed: {
            exp: 0
        },
        death: {
            exp: 0
        },
        protection: {
            exp: 0
        },
        gems: {
            exp: 0
        },
        click: {
            exp: 0
        },
        smartphone: {
            exp: 0
        },
        telephone: {
            exp: 0
        },
        luck: {
            exp: 0
        },
        token: {
            exp: 0
        },
        balancer: {
            exp: 0
        },
        lockpick: {
            exp: 0
        },
        lock: {
            exp: 0
        },
        crowbar: {
            exp: 0
        },
        steal: {
            exp: 0
        },
        auricore: {
            exp: 0
        },
        elixir: {
            exp: 0
        },
        sphere: {
            exp: 0
        },
        iron: {
            exp: 0
        },
        gold: {
            exp: 0
        },
        diamond: {
            exp: 0
        },
        emerald: {
            exp: 0
        },
        orb: {
            exp: 0
        },
        keping: {
            exp: 0
        },
        crypto: {
            exp: 0
        },
        ducky: {
            exp: 0
        },
        trash: {
            exp: 0
        },
        armor: {
            exp: 0
        },
        sword: {
            exp: 0
        },
        pickaxe: {
            exp: 0
        },
        fishingrod: {
            exp: 0
        },
        wood: {
            exp: 0
        },
        rock: {
            exp: 0
        },
        string: {
            exp: 0
        },
        ironore: {
            exp: 0
        },
        goldore: {
            exp: 0
        },
        diamondore: {
            exp: 0
        },
        ancientdebris: {
            exp: 0
        },
        silver: {
            exp: 0
        },
        light_gold: {
            exp: 0
        },
        crystal: {
            exp: 0
        },
        ant: {
            exp: 0
        },
        horse: {
            exp: 0
        },
        cat: {
            exp: 0
        },
        dog: {
            exp: 0
        },
        fox: {
            exp: 0
        },
        dragon: {
            exp: 0
        },
        panda: {
            exp: 0
        },
        petFood: {
            exp: 0
        },
        car: {
            exp: 0
        },
        fuel: {
            exp: 0
        },
        medkit: {
            exp: 0
        },
    },
    delgm: {
        level: {
            exp: 0
        },
        exp: {
            exp: 0
        },
        social: {
            exp: 0
        },
        money: {
            exp: 0
        },
        potion: {
            exp: 0
        },
        burger: {
            exp: 0
        },
        pizza: {
            exp: 0
        },
        kentang: {
            exp: 0
        },
        maxcrate: {
            exp: 0
        },
        uncommon: {
            exp: 0
        },
        common: {
            exp: 0
        },
        rare: {
            exp: 0
        },
        mythical: {
            exp: 0
        },
        legendary: {
            exp: 0
        },
        ancient: {
            exp: 0
        },
        pet: {
            exp: 0
        },
        kepercayaanwaifu: {
            exp: 0
        },
        kepercayaanhusbu: {
            exp: 0
        },
        strength: {
            exp: 0
        },
        psychic: {
            exp: 0
        },
        defense: {
            exp: 0
        },
        speed: {
            exp: 0
        },
        death: {
            exp: 0
        },
        protection: {
            exp: 0
        },
        gems: {
            exp: 0
        },
        click: {
            exp: 0
        },
        smartphone: {
            exp: 0
        },
        telephone: {
            exp: 0
        },
        luck: {
            exp: 0
        },
        token: {
            exp: 0
        },
        balancer: {
            exp: 0
        },
        lockpick: {
            exp: 0
        },
        lock: {
            exp: 0
        },
        crowbar: {
            exp: 0
        },
        steal: {
            exp: 0
        },
        auricore: {
            exp: 0
        },
        elixir: {
            exp: 0
        },
        sphere: {
            exp: 0
        },
        iron: {
            exp: 0
        },
        gold: {
            exp: 0
        },
        diamond: {
            exp: 0
        },
        emerald: {
            exp: 0
        },
        orb: {
            exp: 0
        },
        keping: {
            exp: 0
        },
        crypto: {
            exp: 0
        },
        ducky: {
            exp: 0
        },
        trash: {
            exp: 0
        },
        armor: {
            exp: 0
        },
        sword: {
            exp: 0
        },
        pickaxe: {
            exp: 0
        },
        fishingrod: {
            exp: 0
        },
        wood: {
            exp: 0
        },
        rock: {
            exp: 0
        },
        string: {
            exp: 0
        },
        ironore: {
            exp: 0
        },
        goldore: {
            exp: 0
        },
        diamondore: {
            exp: 0
        },
        ancientdebris: {
            exp: 0
        },
        silver: {
            exp: 0
        },
        light_gold: {
            exp: 0
        },
        crystal: {
            exp: 0
        },
        ant: {
            exp: 0
        },
        horse: {
            exp: 0
        },
        cat: {
            exp: 0
        },
        dog: {
            exp: 0
        },
        fox: {
            exp: 0
        },
        dragon: {
            exp: 0
        },
        panda: {
            exp: 0
        },
        petFood: {
            exp: 0
        },
        car: {
            exp: 0
        },
        fuel: {
            exp: 0
        },
        medkit: {
            exp: 0
        },
    }
}

let jarspy = async (m, { conn, command, usedPrefix, args }) => {
    let user = await db.users.get(m.sender)
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
Contoh pemakaian: *${usedPrefix}${command} money 10*

▢ Daftar item: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${rpg.emoticon(v)}${v}`.trim()
    }).join('\n')}
`.trim()
    const item = (args[0] || '').toLowerCase()
    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!listItems[item]) return m.reply(info)
    if (command.toLowerCase() == 'gm') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${paymentMethod} untuk menambahkan *${total}* ${item}. Kamu membutuhkan *${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* ${paymentMethod} lagi untuk bisa menambahkan`)
        await db.users.update(m.sender, (user) => {
            user[paymentMethod] -= listItems[item][paymentMethod] * total
            user[item] += total
        })
        return m.reply(`Spawn *${total}* ${item}`)
    } else {
        if (user[item] < total) return m.reply(`Kamu tidak memiliki cukup *${item}* untuk dihapus, kamu hanya memiliki ${user[item]} item`)
        const reward = listItems[item]
        if (Object.keys(reward).length > 1) throw new Error('Banyak hadiah belum didukung')
        const rewardKey = Object.keys(reward)[0]
        if (!(rewardKey in user)) throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi hadiah memberikannya`)
        await db.users.update(m.sender, (user) => {
            user[item] -= total
            user[rewardKey] += listItems[item][rewardKey] * total
        })
        return m.reply(`*-${total}* ${item}`)
    }
}

jarspy.help = ['gm', 'delgm']
jarspy.tags = ['owner']
jarspy.command = /^(gm|delgm)$/i
jarspy.owner = true

jarspy.disabled = false

export default jarspy

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
    number = parseInt(number * 1)
    if (!isNumber(number)) return number
    const formatter = Intl.NumberFormat('en', { notation: 'compact' })
    return formatter.format(number)
}