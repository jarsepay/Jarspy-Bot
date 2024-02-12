/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args, text, usedPrefix, command }) => {
 let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
 const user = await db.users.get(who)
 const usar = await db.users.get(m.sender)
 if (usar.job == 'polisi') {
    if (!text) throw 'Siapa yang mau di keluarkan dari penjara?'
    if (!who) return m.reply('Tag target atau ketik nomornya')
    const usar = await db.users.get(m.sender)
    if (!user) return m.reply(`Pengguna ${who} tidak ada dalam database`)
    
    await db.users.update(who, (user) => {
        user.jail = false
    })
    setTimeout(() => {
    conn.reply(who, `Kamu telah di dikeluarkan dari penjara oleh ${usar.nama}`)
    }, 5000)
    conn.reply(m.chat, `Berhasil membebaskan *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* dari penjara`, null, { mentions: [who] })
    return
   }
   await conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai polisi', m)
}

jarspy.help = ['outjail']
jarspy.tags = ['roleplay']
jarspy.command = /^outjail$/i

export default jarspy