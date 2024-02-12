import db from '../lib/database/index.js'

let jarspy = async (m, { participants, text }) => {
  if (!text) {
    let info = `
*Cara Menggunakan /setbye*

/setbye @user

◦ @user  : Menandai pengguna dalam pesan selamat datang.

Contoh penggunaan:
/setbye Selamat tinggal @user
`.trim()
    m.reply(info)
    return
  }

  let chat = await db.chats.get(m.chat)
  
  await db.chats.update(m.chat, chat => {
    chat.sBye = text
  })
  
  m.reply('Berhasil mengatur pesan selamat tinggal')
}

jarspy.help = ['setbye']
jarspy.tags = ['group']
jarspy.command = /^setbye$/i
jarspy.admin = true
jarspy.group = true

export default jarspy