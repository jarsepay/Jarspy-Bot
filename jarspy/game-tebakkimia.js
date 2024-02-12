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
  
     conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {} 
     let id = m.chat 
     if (id in conn.tebakkimia) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebakkimia[id][0]) 
         throw false 
     } 
     let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')).json() 
   let json = src[Math.floor(Math.random() * src.length)] 
     let caption = `⌕ *${command.toUpperCase()}* 
▢ Unsur kimia : *[ ${json.lambang} ]* 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hkim untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.tebakkimia[id] = [ 
         await conn.reply(m.chat, caption, m),
         json, poin, 
         setTimeout(() => { 
             if (conn.tebakkimia[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.unsur}* *[ ${json.lambang} ]*`, conn.tebakkimia[id][0]) 
             delete conn.tebakkimia[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebakkimia'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebakkimia/i 
  
export default jarspy