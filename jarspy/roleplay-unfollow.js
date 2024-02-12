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
    let who = ((m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '').replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (!who) return m.reply('Tag target atau ketik nomornya')
    let _user = await db.users.get(who)
    let index = user.following.indexOf(who)
    if (index === -1) return m.reply('Kamu belum follow orang ini')
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (_user.banned == true) return m.reply(`Kamu tidak bisa unfollow orang yang terbanned`)

    let confirm = `
Apakah kamu yakin ingin berhenti mengikuti *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
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

    let users = getUserCache();
    let followers = users.filter(user => user.following.includes(m.sender)).map(follower => Object.values(follower)[0].slice(0, -5));

    if (/❌|no?/g.test(m.text.toLowerCase())) {
        clearTimeout(timeout)
        delete confirmation[sender]
        return m.reply('Membatalkan unfollow')
    }

    if (/✅|y(es)?/g.test(m.text.toLowerCase())) {
        await db.users.update(sender, (user) => {
            let index = user.following.indexOf(to)
            user.following.splice(index, 1)
        })

        await db.users.update(to, (_user) => {
            _user.followers = followers.length - 1
        })

        m.reply(`Berhasil unfollow *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        clearTimeout(timeout)
        delete confirmation[sender]
    }
}

jarspy.help = ['unfollow'].map(v => v + '')
jarspy.tags = ['roleplay']
jarspy.command = /^(unfollow)$/i

jarspy.disabled = false

export default jarspy