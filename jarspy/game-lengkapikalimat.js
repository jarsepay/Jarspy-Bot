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
  
     conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {} 
     let id = m.chat 
     if (id in conn.lengkapikalimat) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.lengkapikalimat[id][0]) 
         throw false 
     } 
     let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/lengkapikalimat.json')).json() 
     let json = src[Math.floor(Math.random() * src.length)] 
   let caption = `⌕ *${command.toUpperCase()}* 
   ${json.pertanyaan} 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hlen untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     conn.lengkapikalimat[id] = [ 
         await conn.reply(m.chat, caption, m),
         json, poin, 
         setTimeout(() => { 
             if (conn.lengkapikalimat[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.lengkapikalimat[id][0]) 
             delete conn.lengkapikalimat[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['lengkapikalimat'] 
jarspy.tags = ['game'] 
jarspy.command = /^lengkapikalimat/i 
  
export default jarspy