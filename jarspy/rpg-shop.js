/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

const items = {
    buy: {
        wood: {
            money: 3000
        },
        rock: {
            money: 8000,
        },
        string: {
            money: 10000,
        },
        limit: {
            money: 5000,
        },
        potion: {
            money: 1000,
        },
        medkit: {
            money: 400,
        },
        fuel: {
            money: 1000,
        },
        car: {
            money: 10000,
        },
        uncommon: {
            money: 700,
        },
        common: {
            money: 1000,
        },
        rare: {
            money: 3000,
        },
        mythical: {
            money: 12000,
        },
        legendary: {
            money: 40000,
        },
        ancient: {
            money: 1000000,
        },
        chest: {
            money: 1500000,
        },
        maxcrate: {
            ancient: 1000,
        },
        telephone: {
            money: 4000000,
        },
        smartphone: {
            money: 5000000,
        },
        pickaxe: {
            money: 500000,
        }
    },
    sell: {
        wood: {
            money: 1500
        },
        rock: {
            money: 4000,
        },
        string: {
            money: 5000,
        },
        limit: {
            money: 2500,
        },
        potion: {
            money: 500,
        },
        medkit: {
            money: 200,
        },
        fuel: {
            money: 500,
        },
        car: {
            money: 5000,
        },
        uncommon: {
            money: 350,
        },
        common: {
            money: 500,
        },
        rare: {
            money: 1500,
        },
        mythical: {
            money: 6000,
        },
        legendary: {
            money: 20000,
        },
        ancient: {
            money: 500000,
        },
        chest: {
            money: 750000,
        },
        maxcrate: {
            money: 1500000,
        },
        telephone: {
            money: 2000000,
        },
        smartphone: {
            money: 2500000,
        },
        pickaxe: {
            money: 250000,
        }  
    }
}

let jarspy = async (m, { conn, command, usedPrefix, args, text, isPrems }) => {
    let user = await db.users.get(m.sender)

    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }

    if (command.toLowerCase() == 'shop') {
        let text = `
*🏪 Toko*

Ingin menggunakan *Toko*?
Ketik _/buy_ bila ingin membeli!
Ketik _/sell_ bila ingin menjual!
`.trim()
        conn.reply(m.chat, text, m)
        return
    }

    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
Contoh pemakaian: *${usedPrefix}${command} limit 10*
    
▢ Daftar Barang: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${global.rpg.emoticon(v)}${v} | ${toSimple(listItems[v][paymentMethod])} ${global.rpg.emoticon(paymentMethod)}${paymentMethod}`.trim()
    }).join('\n')}
`.trim()

    const item = (args[0] || '').toLowerCase()

    if (!listItems[item]) {
        return m.reply(info)
    }

    if (!args[1]) {
        m.reply(info)
        return
    }

    let total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1)) : 1) * ({"K":1e3,"M":1e6,"B":1e9,"T":1e12,"QA":1e15,"QI":1e18,"SX":1e21,"SP":1e24,"OC":1e27,"N":1e30,"DC":1e33,"UD":1e36,"DD":1e39,"TD":1e42,"QUA":1e45,"QUI":1e48, "SXD":1e51, "SPD":1e54, "OCD":1e57, "NOD":1e60, "VG":1e63}[args[1].toUpperCase().replace(/[^KMBTQAISXONDCUP]/g,'')] || 1);

    if (command.toLowerCase() == 'buy') {
        user = await db.users.get(m.sender)
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        let previous = user[paymentMethod] * 1; // Simpan nilai uang sebelumnya
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) {
            return m.reply(`Kamu tidak memiliki cukup ${global.rpg.emoticon(paymentMethod)}${paymentMethod} untuk membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${item}. Kamu memerlukan *${toSimple((listItems[item][paymentMethod] * total) - user[paymentMethod])}* ${paymentMethod} lagi untuk dapat membeli`)
        }
        // Mengurangi uang dan menambahkan item
        await db.users.update(m.sender, (user) => {
            user[paymentMethod] -= listItems[item][paymentMethod] * total
            user[item] += total
            user.lastshop = new Date() * 1
        })
        return m.reply(`Kamu telah membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${item}`)
    } else if (command.toLowerCase() == 'sell') {
        let previous = user[item] * 1; // Simpan jumlah item sebelum penjualan
        if (isPrems && /all/i.test(args[1])) {
            total = user[item];
        }
        if (user[item] < total) {
            return m.reply(`Kamu tidak memiliki cukup *${global.rpg.emoticon(item)}${item}* untuk dijual. Anda hanya memiliki ${toSimple(user[item])} item`)
        }
        const reward = listItems[item]
        if (Object.keys(reward).length > 1) {
            throw new Error('Banyak hadiah belum didukung')
        }
        const rewardKey = Object.keys(reward)[0]
        if (!(rewardKey in user)) {
            throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi hadiah memberikannya!`)
        }
        // Mengurangi item dan menambahkan hadiah
        await db.users.update(m.sender, (user) => {
            user[item] -= total
            user[rewardKey] += listItems[item][rewardKey] * total
            user.lastshop = new Date() * 1
        })
        return m.reply(`Kamu telah menjual *${toSimple(total)}* ${global.rpg.emoticon(item)}${item} dan mendapatkan *${toSimple(listItems[item][rewardKey] * total)}* ${global.rpg.emoticon(rewardKey)}`)
    }
}

jarspy.help = ['buy', 'sell']
jarspy.tags = ['rpg']
jarspy.command = /^(shop|buy|sell)$/i

jarspy.disabled = false

export default jarspy

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
    if (isNaN(parseFloat(number))) return number
    if (parseFloat(number) === 0) return '0'
    number = parseFloat(number).toFixed(0)
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg']
    const base = 1000
    const exponent = Math.floor(Math.log10(Math.abs(number)) / 3)
    const suffix = suffixes[exponent] || ''
    const simplified = number / Math.pow(base, exponent)
    const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 })
    return formatter.format(simplified) + suffix
}