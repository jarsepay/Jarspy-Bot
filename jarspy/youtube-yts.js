/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import yts from 'yt-search' 
 import fs from 'fs' 
  
 let jarspy = async (m, {conn, text }) => { 
   if (!text) throw 'Masukkan judul yang ingin kamu cari' 
   await m.react('🕑')
   let results = await yts(text) 
   let tes = results.all 
   let teks = results.all.map(v => { 
     switch (v.type) { 
       case 'video': return ` 
◦ *_${v.title}_* 
◦ *_Durasi :_* ${v.url} 
◦ *_Durasi :_* ${v.timestamp} 
◦ *_Diunggah :_* ${v.ago} 
◦ *_Penonton :_* ${v.views}`}}).filter(v => v).join('\n••••••••••••••••••••••••••••••••••••••••\n') 
   conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m) 
 } 
  
 jarspy.help = ['yts'] 
 jarspy.tags = ['youtube'] 
 jarspy.command = /^yts(earch)?$/i 
 jarspy.limit = 5 
  
 export default jarspy