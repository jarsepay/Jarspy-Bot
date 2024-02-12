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
  
     conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {} 
     let id = m.chat 
     if (id in conn.tebaktebakan) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebaktebakan[id][0]) 
         throw false 
     } 
     let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')).json() 
   let json = src[Math.floor(Math.random() * src.length)] 
   let caption = `⌕ *${command.toUpperCase()}* 
   ${json.soal} 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hteb untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.tebaktebakan[id] = [ 
         await conn.reply(m.chat, caption, m), 
         json, poin, 
         setTimeout(() => { 
             if (conn.tebaktebakan[id]) conn.reply(m.chat, `Waktu habis!*\nJawabannya adalah *${json.jawaban}*`, conn.tebaktebakan[id][0]) 
             delete conn.tebaktebakan[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebaktebakan'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebaktebakan/i 
  
export default jarspy 
  
const buttons = [ 
     ['Hint', '/hteb'], 
     ['Nyerah', 'menyerah'] 
 ]