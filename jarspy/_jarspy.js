/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { sticker } from '../lib/sticker.js'

let jarspy = async (m, { conn }) => { 
let stiker = await sticker(null, global.API(`https://telegra.ph/file/9b8e85c7d94036bbaf915.mp4`), global.packname, global.author)
    if (stiker) return await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}
jarspy.customPrefix = /^(@6282148864989|jarspy|jarsepay)$/i
jarspy.command = new RegExp

export default jarspy