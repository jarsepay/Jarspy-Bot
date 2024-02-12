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
     conn.tebaklogo = conn.tebaklogo ? conn.tebaklogo : {} 
     let id = m.chat 
     if (id in conn.tebaklogo) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebaklogo[id][0]) 
         throw false 
     } 
     let res = await fetch(`https://raw.githubusercontent.com/orderku/db/main/dbbot/game/tebakapp.json`) 
     let src = await res.json() 
     let Apps = src[Math.floor(Math.random() * src.length)] 
     let json = { hasil: Apps } 
     let caption = `*${command.toUpperCase()}* 
⌕ Logo apakah ini? 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hlog untuk hint 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.tebaklogo[id] = [ 
         await conn.sendFile(m.chat, json.hasil.data.image, '', caption, m), 
         json, poin, 
         setTimeout(() => { 
             if (conn.tebaklogo[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.hasil.data.jawaban}*`, conn.tebaklogo[id][0]) 
             delete conn.tebaklogo[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebaklogo'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebaklogo/i 
  
export default jarspy 
  
const buttons = [ 
     ['Hint', '/hlog'], 
     ['Nyerah', 'menyerah'] 
 ]