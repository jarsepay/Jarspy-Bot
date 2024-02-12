/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args, text, usedPrefix, command }) => {
 const JAIL_TIME = 60 * 60 * 1000
 let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
 const user = await db.users.get(who)
 const usar = await db.users.get(m.sender)
 if (usar.job == 'polisi') {
    if (!text) throw 'Siapa yang mau di penjara?'
    if (!who) return m.reply('Tag target atau ketik nomornya')
    if (!user) return m.reply(`Pengguna ${who} tidak ada dalam database`)
    
    await db.users.update(who, (user) => {
        user.jail = true
        user.jailExpired = Date.now() + JAIL_TIME
    })
    
    await db.users.update(m.sender, (usar) => {
        usar.jobexp += 1
    })
    setTimeout(() => {
    conn.reply(who, `Kamu telah di penjara oleh ${usar.nama}`)
    }, 5000)
    conn.reply(m.chat, `Berhasil penjara *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*\n🧤 +1 Tingkat Kerja Keras\n\n_Jika polisi diketahui memenjarai seseorang tanpa alasan tertentu, maka akan langsung diban oleh pihak atasan._`, null, { mentions: [who] })
    return
   }
   await conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai polisi', m)
}

jarspy.help = ['penjara']
jarspy.tags = ['roleplay']
jarspy.command = /^penjara$/i

export default jarspy