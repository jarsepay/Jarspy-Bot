/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

const items = {
    buyfood: {
        burger: {
            money: 1100,
        },
        pizza: {
            money: 2100,
        },
        kentang: {
            money: 200,
        },
    },
    sellfood: {
        burger: {
            money: 550,
        },
        pizza: {
            money: 1000,
        },
        kentang: {
            money: 100,
        },
    }
}

let jarspy = async (m, { conn, command, usedPrefix, args, text, isPrems }) => {
    let user = await db.users.get(m.sender)
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (command.toLowerCase() == 'foodshop') {
        let text = `
*🏪 Toko Makanan*

Ingin menggunakan *toko*?
Ketik _/buyfood_ bila ingin membeli makanan!
Ketik _/sellfood_ bila ingin menjual makanan!
`.trim()
        conn.reply(m.chat, text, m)
        return
    }
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
⌕ Contoh penggunaan: *${usedPrefix}${command} burger 10*
    
▢ Daftar Barang: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${global.rpg.emoticon(v)}${v} | ${toSimple(listItems[v][paymentMethod])} ${global.rpg.emoticon(paymentMethod)}${paymentMethod}`.trim()
    }).join('\n')}
`.trim()
    const item = (args[0] || '').toLowerCase()
    let total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!listItems[item]) return m.reply(info)
    if (command.toLowerCase() == 'buyfood') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu tidak memiliki cukup ${paymentMethod} untuk membeli *${total}* ${item}. Kamu membutuhkan *${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* ${paymentMethod} lagi untuk dapat membeli`)
        await db.users.update(m.sender, (user) => {
            user[paymentMethod] -= listItems[item][paymentMethod] * total
            user[item] += total
        })
        return m.reply(`Kamu telah membeli *${toSimple(total)}* ${item}`)
    } else if (command.toLowerCase() == 'sellfood') {
        if (isPrems && /all/i.test(args[1])) total = Math.max(Math.floor(parseInt(user[item])), 1)
        if (user[item] < total) return m.reply(`Kamu tidak memiliki cukup *${item}* untuk menjual, Anda hanya memiliki ${user[item]} item`)
        const reward = listItems[item]
        if (Object.keys(reward).length > 1) throw new Error('Banyak hadiah belum didukung')
        const rewardKey = Object.keys(reward)[0]
        if (!(rewardKey in user)) throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi reward memberikannya`)
        await db.users.update(m.sender, (user) => {
            user[item] -= total
            user[rewardKey] += listItems[item][rewardKey] * total
        })
        return m.reply(`Kamu telah menjual *${toSimple(total)}* ${item} dan mendapatkan *${toSimple(listItems[item][rewardKey] * total)}*`)
    }
}

jarspy.help = ['buyfood', 'sellfood'].map(v => v + '')
jarspy.tags = ['rpg']
jarspy.command = /^(foodshop|buyfood|sellfood)$/i

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

function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}
