import db from '../lib/database/index.js'

let jarspy = async (m, { conn, usedPrefix }) => {
  let chat = await db.chats.get(m.chat)
  if (chat.banned === false) {
    m.reply('Chat ini tidak dalam keadaan terbanned.')
    return
  }

  await db.chats.update(m.chat, chat => {
    chat.banned = false
  })

  m.reply('Chat berhasil diunbanned.')
}
jarspy.help = ['unbanchat']
jarspy.tags = ['group']
jarspy.command = /^unbanchat$/i

jarspy.admin = true;
jarspy.group = true;

export default jarspy