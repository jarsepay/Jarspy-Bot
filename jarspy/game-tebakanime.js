/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch' 
let timeout = 120000 
let poin = 4999 
let jarspy = async (m, { conn, command, usedPrefix }) => { 
     conn.tebakanjime = conn.tebakanjime ? conn.tebakanjime : {} 
     let id = m.chat 
     if (id in conn.tebakanjime) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebakanjime[id][0]) 
         throw false 
     } 
     let res = await fetch('https://api.jikan.moe/v4/random/characters') 
     let jsn = await res.json() 
     let json = jsn.data 
     let caption = `*${command.toUpperCase()}* 
⌕ Siapakah nama dari gambar ini 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hani untuk hint 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.tebakanjime[id] = [ 
         await conn.sendFile(m.chat, json.images.jpg.image_url, '', caption, m), 
         json, poin, 
         setTimeout(() => { 
             if (conn.tebakanjime[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*\n*Desk:* ${json.name_kanji}\n${json.about}`, conn.tebakanjime[id][0]) 
             delete conn.tebakanjime[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebakanime'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebakanime/i 
  
export default jarspy 
  
const buttons = [ 
     ['Hint', '/hani'], 
     ['Nyerah', 'menyerah'] 
 ]