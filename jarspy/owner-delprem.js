import db from '../lib/database/index.js'

let jarspy = async (m, { conn, usedPrefix, command, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    else who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    let user = await db.users.get(who)
    if (!who) return m.reply(`Tag orangnya`)
    if (!global.prems.includes(who.split`@`[0])) throw 'Pengguna bukan Premium'
    let index = global.prems.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
    global.prems.splice(index, 1)
    conn.reply(m.chat, `@${who.split('@')[0]} tidak lagi premium`, m, { mentions: [who] })
    return
}
jarspy.help = ['delprem']
jarspy.tags = ['owner']
jarspy.command = ['delprem', 'delpremium']

jarspy.group = true

export default jarspy