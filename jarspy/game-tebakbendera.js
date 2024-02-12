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
     conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {} 
     let id = m.chat 
     if (id in conn.tebakbendera) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebakbendera[id][0]) 
         throw false 
     } 
     let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json')).json() 
   let json = src[Math.floor(Math.random() * src.length)] 
     let caption = `⌕ *${command.toUpperCase()}* 
     
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hben untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.tebakbendera[id] = [ 
         await conn.sendFile(m.chat, json.img, 'bendera.jpg', caption, m), 
         json, poin, 
         setTimeout(() => { 
             if (conn.tebakbendera[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, conn.tebakbendera[id][0]) 
             delete conn.tebakbendera[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebakbendera'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebakbendera/i 
  
export default jarspy