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
let play_list = ['37i9dQZEVXbObFQZ3JLcXt', '37i9dQZEVXbMDoHDwVN2tF', '37i9dQZF1DXa2EiKmMLhFD', '37i9dQZF1DXdHrK6XFPCM1', '3AaKHE9ZMMEdyRadsg8rcy', '4mFuArYRh3SO8jfffYLSER'] 
let spotify_id = play_list.getRandom() 
  
     conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {} 
     let id = m.chat 
     if (id in conn.tebaklagu) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebaklagu[id][0]) 
         throw false 
     } 
  
     try { 
     let ress = await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebaklagu.json') 
    let data = await ress.json() 
     let json = data[Math.floor(Math.random() * data.length)] 
     // if (!json.status) throw json 
     let caption = `*${command.toUpperCase()}* 
⌕ Penyanyi: ${json.artis} 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik *${usedPrefix}hlag* untuk bantuan 
◦ Bonus: ${poin} XP 
◦ *Balas pesan ini untuk menjawab!*`.trim() 
     conn.tebaklagu[id] = [ 
         await conn.reply(m.chat, caption, m), 
         json, poin, 
         setTimeout(() => { 
             if (conn.tebaklagu[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.judul}*`, conn.tebaklagu[id][0]) 
             delete conn.tebaklagu[id] 
         }, timeout) 
     ] 
     await conn.sendMessage(m.chat, { audio: { url: json.lagu }, seconds: fsizedoc, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m }) 
    } catch (e) { 
    throw eror 
       } 
} 
jarspy.help = ['tebaklagu'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebaklagu/i 
  
export default jarspy 
  
const buttons = [ 
     ['Hint', '/hlag'], 
     ['Nyerah', 'menyerah'] 
 ]