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
  
     conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {} 
     let id = m.chat 
     if (id in conn.tebaklirik) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebaklirik[id][0]) 
         throw false 
     } 
     let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json') 
     if (!res.ok) throw await `${res.status} ${res.statusText}` 
     let data = await res.json() 
     let json = data[Math.floor(Math.random() * data.length)] 
     let caption = `⌕ *${command.toUpperCase()}* 
 ${json.soal} 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hlir untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.tebaklirik[id] = [ 
         await conn.reply(m.chat, caption, m),
         json, poin, 
         setTimeout(() => { 
             if (conn.tebaklirik[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaklirik[id][0]) 
             delete conn.tebaklirik[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebaklirik'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebaklirik/i 
 
export default jarspy