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
  
     conn.tebaksurah = conn.tebaksurah ? conn.tebaksurah : {} 
     let id = m.chat 
     if (id in conn.tebaksurah) { 
         conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.tebaksurah[id][0]) 
         throw false 
     } 
     let ran = 6236 
     let res = await fetch('https://api.alquran.cloud/v1/ayah/' + ran.getRandom() + '/ar.alafasy') 
     if (res.status !== 200) throw await res.text() 
     let result = await res.json() 
     let json = result.data 
     if (result.code == '200') { 
     // if (!json.status) throw json 
     let caption = `*${command.toUpperCase()}* 
⌕ Nomor Dalam Surah: ${json.numberInSurah} 
⌕ Oleh: ${json.edition.name} ${json.edition.englishName} 
  
◦ Timeout *${(timeout / 1000).toFixed(2)} detik* 
◦ Ketik *${usedPrefix}hsur* untuk bantuan 
◦ Bonus: ${poin} XP 
◦ *Balas pesan ini untuk menjawab!*`.trim() 
  
 let captu = ` 
 *${json.surah.englishName}* 
  
⌕ *INFORMASI* 
◦ Nomor Surah: ${json.surah.number} 
◦ Nama Surah: ${json.surah.name} ${json.surah.englishName} 
◦ Nama Inggris: ${json.surah.englishNameTranslation} 
◦ Jumlah Ayat: ${json.surah.numberOfAyahs} 
◦ Tipe: ${json.surah.revelationType} 
 ` 
  
     conn.tebaksurah[id] = [ 
         await conn.reply(m.chat, caption, m), 
         json, poin, 
         setTimeout(() => { 
             if (conn.tebaksurah[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${captu}`, conn.tebaksurah[id][0]) 
             delete conn.tebaksurah[id] 
         }, timeout) 
     ] 
     await conn.sendFile(m.chat, json.audio, 'coba-lagi.mp3', '', m) 
     } else if (result.code == '404') { 
     m.reply(`Ulangi! Command ${usedPrefix + command} Karena ${json.data}`) 
     } 
} 
jarspy.help = ['tebaksurah'] 
jarspy.tags = ['game'] 
jarspy.command = /^tebaksurah/i 
  
export default jarspy 
  
const buttons = [ 
     ['Hint', '/hsur'], 
     ['Nyerah', 'menyerah'] 
 ]