import db from '../lib/database/index.js'

let jarspy = async (m, { conn, usedPrefix }) => {
  let chat = await db.chats.get(m.chat)
  if (chat.banned === true) {
    m.reply('Chat ini sudah dalam keadaan terbanned.')
    return
  }

  await db.chats.update(m.chat, chat => {
    chat.banned = true
  })

  m.reply('Chat berhasil dibanned.')
}
jarspy.help = ['banchat']
jarspy.tags = ['group']
jarspy.command = /^banchat$/i

jarspy.admin = true;
jarspy.group = true;

export default jarspy