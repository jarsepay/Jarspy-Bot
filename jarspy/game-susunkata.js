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
  
     conn.susunkata = conn.susunkata ? conn.susunkata : {} 
     let id = m.chat 
     if (id in conn.susunkata) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0]) 
         throw false 
     } 
     let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')).json() 
   let json = src[Math.floor(Math.random() * src.length)] 
   let caption = `*${command.toUpperCase()}* 
⌕ ${json.soal} 
⌕ ${json.tipe} 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hsus untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.susunkata[id] = [ 
         await conn.reply(m.chat, caption, m),
         json, poin, 
         setTimeout(() => { 
             if (conn.susunkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.susunkata[id][0]) 
             delete conn.susunkata[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['susunkata'] 
jarspy.tags = ['game'] 
jarspy.command = /^susunkata/i 
  
export default jarspy 
  
const buttons = [ 
     ['Hint', '/hsus'], 
     ['Nyerah', 'menyerah'] 
 ]