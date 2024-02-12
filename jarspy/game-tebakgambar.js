/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { tebakgambar } from '@bochilteam/scraper' 
 import { 
     webp2png 
 } from '../lib/webp2mp4.js' 
  
let timeout = 120000 
let poin = 4999 
let jarspy = async (m, { conn, command, usedPrefix }) => { 
     conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {} 
     let id = m.chat 
     if (id in conn.tebakingambar) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebakingambar[id][0]) 
         throw false 
     } 
     let json = await tebakgambar() 
     let caption = `*${command.toUpperCase()}* 
⌕ Rangkailah Gambar Ini 
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik ${usedPrefix}hgam untuk bantuan 
◦ Bonus: ${poin} XP 
     `.trim() 
     let imgurl = await imageUrl(json.img) 
     conn.tebakingambar[id] = [ 
         await conn.sendFile(m.chat, imgurl, '', caption, m), 
         json, poin, 
         setTimeout(() => { 
             if (conn.tebakingambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakingambar[id][0]) 
             delete conn.tebakingambar[id] 
         }, timeout) 
     ] 
} 
jarspy.help = ['tebakgambar'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebakgambar/i 
  
export default jarspy 
  
async function imageUrl(url) { 
   try { 
     let Blobs = await(await fetch(url)).blob() 
let arrayBuffer = await Blobs.arrayBuffer(); 
     let buffer = Buffer.from(arrayBuffer); 
   let pngBuffer = await webp2png(buffer); 
   return pngBuffer 
   } catch (error) { 
     console.error("Error:", error); 
   } 
 } 
  
const buttons = [ 
     ['Hint', '/hgam'], 
     ['Nyerah', 'menyerah'] 
 ]