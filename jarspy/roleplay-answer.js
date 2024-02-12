/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let deny = {}

async function jarspy(m, { conn, args, usedPrefix, command }) {
    let user = await db.users.get(m.sender)
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.partner != '-') {
        return m.reply('Kamu sudah memiliki pasangan. Tidak bisa menerima permintaan pacaran dari orang lain')
    }
    let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!who) return m.reply('Tag salah satu, atau ketik Nomornya')
    if (!(await db.users.get(who))) return m.reply(`Pengguna ${who} tidak ada di database`)
    let _user = await db.users.get(who)
    if (_user.partner != '-') {
        return m.reply('Dia sudah memiliki pasangan! Tidak bisa menerima permintaan pacaran dari orang yang sudah punya pacar!')
    }
    if (_user.crush != m.sender) return m.reply(`Dia tidak memiliki crush kepada kamu`)
    if (_user.banned == true) return m.reply(`Kamu tidak bisa menjawab permintaan pacaran dari orang yang terbanned`)
    let confirm = `
Apakah kamu ingin pacaran dengan *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*?
Timeout *60* detik
Ketik "y" untuk iya ✅ dan "n" ❌ untuk tidak!
`.trim()
    let c = conn.getName(conn.user.jid)
    await conn.reply(m.chat, confirm, null, { mentions: [who] })
    //await conn.sendButton(m.chat, confirm, c, null, [['✅'], ['❌']], m, { mentions: [who] })
    deny[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        timeout: setTimeout(() => (m.reply('Timeout'), delete deny[m.sender]), 60 * 1000)
    }
}

jarspy.before = async (m, { conn }) => {
    let txt = `
🌹 Pernyataan cinta anda telah di terima oleh *@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')}*! 🌹

💘💘💘 Kalian resmi jadian! 🥰🥰🥰
`.trim()
    if (m.isBaileys) return
    if (!(m.sender in deny)) return
    if (!m.text) return
    let { timeout, sender, message, to } = deny[m.sender]
    if (m.id === message.id) return
    let user = await db.users.get(sender)
    let _user = await db.users.get(to)
    if (/❌|no?/g.test(m.text.toLowerCase())) {
        clearTimeout(timeout)
        delete deny[sender]
        return m.reply('Menolak permintaan pacaran')
        await db.users.update(to, (_user) => {
          _user.crush = '-'
        })
    }
    if (/✅|y(es)?/g.test(m.text.toLowerCase())) {
        if (_user.partner != '-') {
            clearTimeout(timeout)
            delete deny[sender]
            return m.reply('Kamu tidak bisa menerima permintaan pacaran dari user lain karena sudah memiliki pasangan!')
        }
        await db.users.update(sender, (user) => {
          user.partner = to
          user.crush = '-'
        })
        await db.users.update(to, (_user) => {
          _user.partner = sender
          _user.crush = '-'
        })
        conn.reply(to, txt, m, { mentions: [m.sender] })
        m.reply(`Kamu telah menerima permintaan pacaran dari *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        clearTimeout(timeout)
        delete deny[sender]
    }
}

jarspy.help = ['answer'].map(v => v + '')
jarspy.tags = ['roleplay']
jarspy.command = /^(accept|deny|answer)$/i

jarspy.disabled = false

export default jarspy