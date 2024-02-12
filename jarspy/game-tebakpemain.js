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
  
     conn.tebakpemain = conn.tebakpemain ? conn.tebakpemain : {} 
     let id = m.chat 
     if (id in conn.tebakpemain) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebakpemain[id][0]) 
         throw false 
     } 
     let src = await (await fetch('https://raw.githubusercontent.com/JarPyth/scrape/main/games/tebakpemain.json')).json() 
   let json = src[Math.floor(Math.random() * src.length)] 
     let caption = `⌕ *${command.toUpperCase()}* 
◦ Posisi : ${json.posisi}
◦ Negara : ${json.negara}
◦ Liga : ${json.liga}
◦ Klub : ${json.klub}
◦ Nomor Punggung : ${json.nopung}
 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hbol untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.tebakpemain[id] = [ 
         await conn.reply(m.chat, caption, m),
         json, poin, 
         setTimeout(() => { 
             if (conn.tebakpemain[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakpemain[id][0]) 
             delete conn.tebakpemain[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebakpemain'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebakpemain/i 
  
export default jarspy