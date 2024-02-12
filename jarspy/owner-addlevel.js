import db from '../lib/database/index.js'
import connection from '../lib/connection.js'

let jarspy = async (m, { conn, command, usedPrefix, args }) => {
  if (m.sender === `${global.nomorowner}@s.whatsapp.net`) {
  if (!args[0]) throw 'Level siapa yang ingin di ditambahkan?'
  if (!args[1]) throw 'Berapa level yang ingin ditambahkan?'
  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  if (!who) return m.reply('Tag targetnya')
  
  const user = await db.users.get(who)
  const total = args[1]
  const total2 = user.exp
  
  try {
  await db.users.update(who, (user) => {
  user.level += total * 1
  user.exp += total2 * 2
  })
  
  conn.reply(m.chat, 'Level pengguna berhasil di tambahkan', m)
  
  } catch (e) {
  console.log (e)
  conn.reply(m.chat, 'Nomor tidak valid', m)  
 }
 return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh ${global.namaowner}`, m)
}
jarspy.help = ['addlevel']
jarspy.tags = ['owner']
jarspy.command = /^addlevel$/i

export default jarspy