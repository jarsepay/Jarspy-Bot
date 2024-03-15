/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch'

let jarspy = async(m, { conn, text }) => {
  if (!text) throw `Masukkan Usernamenya`
  await m.react("🕐")
  
  try {
    let url = await fetch(`https://www.forestapi.my.id/api/telegram/user/${text}`)
    let res = await url.json()
   conn.sendFile(m.chat, res.image_url, 'not found.jpg', `Username: ${res.username}\nName: ${res.name}\nBio: ${res.bio}`, m)
   } catch (e) {
   throw e.message
   }
}
jarspy.help = ['telestalk']
jarspy.tags = ['internet']
jarspy.command = /^(telestalk|telegramstalk|stalktelegram)$/i

jarspy.limit = 2

export default jarspy