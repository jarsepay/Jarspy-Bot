import db from '../lib/database/index.js'
import connection from '../lib/connection.js'

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = await db.users.get(who)
    if (!who) throw `Contoh pemakaian: ${usedPrefix + command} @user`
if (global.prems.includes(who.split`@`[0])) throw 'Pengguna yang Disebutkan Sudah adalah premium'
global.prems.push(`${who.split`@`[0]}`)

conn.reply(m.chat, `
✅ PREMIUM

@${who.split`@`[0]} Sekarang telah menjadi pengguna premium
┌───────────
▢ *Nama:* ${conn.getName(who)}
└───────────
`, m, { mentions: [who] })

}
jarspy.help = ['addprem']
jarspy.tags = ['owner']
jarspy.command = ['addprem', 'addpremium'] 
jarspy.rowner = true
jarspy.owner = true

jarspy.group = true

export default jarspy