/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args, text, usedPrefix }) => {
  let usar = await db.users.get(m.sender)
  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  
  if (usar.job == 'dokter') {
  let user = await db.users.get(who)
  if (!text) throw 'Siapa yang mau di heal?'
    if (!who) return m.reply('Tag target atau ketik nomornya')
    if (!user) return m.reply(`Pengguna ${who} tidak ada dalam database`)
  if (user.health >= 100) {
    m.reply(`❤️ Kesehatan ${conn.getName(who)} sudah penuh!`)
    user.health = 100
    await db.users.update(who, user)
    return
  }
  const heal = 40 + (usar.car * 4)
  let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1
  if (usar.medkit < count) {
    return m.reply(`
💉 Medkit kamu tidak cukup, kamu hanya memiliki *${usar.medkit}* 💉 Medkit
Ketik *${usedPrefix}buy medkit ${count - usar.medkit}* untuk membeli 💉 Medkit
`.trim())
  }
  await db.users.update(m.sender, (usar) => {
  usar.medkit -= count * 1
  })
  user.health += heal * count
  if (user.health >= 100) {
    user.health = 100
  }
  await db.users.update(who, user)
  m.reply(`
Berhasil menyembuhkan ${conn.getName(who)} menggunakan *${count}* 💉 
`.trim())
   return
 }
   await conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai dokter', m)
}

jarspy.help = ['healing']
jarspy.tags = ['rpg']
jarspy.command = /^(healing)$/i

export default jarspy

function isNumber(number) {
  if (!number) return number
  number = parseInt(number)
  return typeof number == 'number' && !isNaN(number)
}