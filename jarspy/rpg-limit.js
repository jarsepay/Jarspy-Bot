/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async(m, { conn, args }) => {

let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : ''
  if (!who) {
    who = m.sender
  }
  const user = await db.users.get(who)
  const usar = await db.users.get(m.sender)
  if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  conn.reply(m.chat, `🌌 Limit ${conn.getName(who)} tersisa : *${formatAn(user.limit)}*`, m)
}

jarspy.help = ['limit']
jarspy.tags = ['rpg']
jarspy.command = /^(limit|ceklimit)$/i

export default jarspy

function formatAn(angka) {
  var reverse = angka.toString().split('').reverse().join('');
  var ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');
  return ribuan;
}