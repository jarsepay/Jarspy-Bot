/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import { getUserCache } from './_cache.js';

let confirmation = {}

async function jarspy(m, { conn, args, usedPrefix, command }) {
    let user = await db.users.get(m.sender)

    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
      throw `Kamu harus teregistrasi, untuk itu ketik */set*`
      return
    }

    let who = ((m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (!who) return m.reply('Tag target atau ketik nomornya')
    let _user = await db.users.get(who)
    if (user.following.includes(who)) return m.reply(`Kamu sudah follow orang ini!`)
    if (_user.banned == true) return m.reply(`Kamu tidak bisa follow orang yang terbanned!`)

    let confirm = `
Apakah kamu yakin ingin mengikuti *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
Timeout *60* detik
Ketik "y" untuk iya ✅ dan "n" ❌ untuk tidak!
`.trim()

    let c = conn.getName(conn.user.jid)
    await conn.reply(m.chat, confirm, m, { mentions: [who] })

    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        timeout: setTimeout(() => (m.reply('Timeout'), delete confirmation[m.sender]), 60 * 1000)
    }
}

jarspy.before = async m => {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return

    let { timeout, sender, message, to } = confirmation[m.sender]
    if (m.id === message.id) return

    let user = await db.users.get(sender)
    let _user = await db.users.get(to)
    let users = getUserCache();
    let followers = users.filter(user => user.following.includes(m.sender)).map(follower => Object.values(follower)[0].slice(0, -5));

    if (/❌|no?/g.test(m.text.toLowerCase())) {
        clearTimeout(timeout)
        delete confirmation[sender]
        return m.reply('Membatalkan follow')
    }

    if (/✅|y(es)?/g.test(m.text.toLowerCase())) {
        await db.users.update(sender, (user) => {
            user.following.push(to)
        })
        
        await db.users.update(to, (_user) => {
            _user.followers = followers.length + 1
        })
        m.reply(`Berhasil follow *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        clearTimeout(timeout)
        delete confirmation[sender]
    }
}

jarspy.help = ['follow'].map(v => v + '')
jarspy.tags = ['roleplay']
jarspy.command = /^(follow)$/i

jarspy.disabled = false

export default jarspy

function isNumber(x) {
    return !isNaN(x)
}

function toSimple(number) {
    if (!isNumber(number)) return number
    number = parseInt(number * 1)
    const formatter = Intl.NumberFormat('en', { notation: 'compact' })
    return formatter.format(number)
}