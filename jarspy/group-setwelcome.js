import db from '../lib/database/index.js'

let jarspy = async (m, { participants, text }) => {
  if (!text) {
    let info = `
*Cara Menggunakan /setwelcome*

/setwelcome @user @subject @desc

◦ @user    : Menandai pengguna dalam pesan selamat datang.
◦ @subject : Menulis judul grup.
◦ @desc    : Menunjukkan deskripsi grup.

Contoh penggunaan:
/setwelcome Halo @user, Selamat datang di @subject!
Deskripsi grup: @desc
`.trim()
    m.reply(info)
    return
  }

  let chat = await db.chats.get(m.chat)
  
  await db.chats.update(m.chat, chat => {
    chat.sWelcome = text
  })
  
  m.reply('Berhasil mengatur pesan selamat datang')
}

jarspy.help = ['setwelcome']
jarspy.tags = ['group']
jarspy.command = /^setwelcome$/i
jarspy.admin = true
jarspy.group = true

export default jarspy