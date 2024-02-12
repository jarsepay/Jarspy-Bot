/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch' 
  
let jarspy = async (m, { conn, usedPrefix, text, args, command }) => { 
   let anu = await fetch(`https://api.waifu.im/search?included_tags=raiden-shogun`) 
   let data = await anu.json() 
   let foto = data.images[0].url 
   data = data.images.map((v) => `*Signature:* ${v.signature}\n*Extension:* ${v.extension}\n*ID:* ${v.image_id}\n*Favorit:* ${v.favorites}\n*Warna:* ${v.dominant_color}\n*Sumber:* ${v.source}\n*Artist:* ${v.artist}\n*Diunggah:* ${v.uploaded_at}\n*Like:* ${v.liked_at}\n*NSFW:* ${v.is_nsfw}\n*Lebar:* ${v.width}\n*Tinggi:* ${v.height}\n*Ukuran:* ${v.byte_size}`) 
  conn.sendFile(m.chat, foto, 'anu.png', data, m)
} 
jarspy.help = ['raiden'] 
jarspy.tags = ['anime'] 
jarspy.command = /^(raiden)$/i 
jarspy.limit = 5
 
export default jarspy