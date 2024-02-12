/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import { googleImage } from '@bochilteam/scraper'

let jarspy = async(m, { isPrems, args, conn, text, command, usedPrefix }) => {

let user = await db.users.get(m.sender)

if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }

   if (text.toLowerCase() === 'gojek' && user.level < 5) {
     throw '*Pekerjaan ini hanya tersedia dilevel 5*'
      return
    }
   
   if (text.toLowerCase() === 'kurir' && user.level < 7) {
     throw '*Pekerjaan ini hanya tersedia dilevel 7*'
      return
    }

   if (text.toLowerCase() === 'sopir' && user.level < 10) {
     throw '*Pekerjaan ini hanya tersedia dilevel 10*'
      return
    }
    
   if (text.toLowerCase() === 'karyawan indomaret' && user.level < 15) {
     throw '*Pekerjaan ini hanya tersedia dilevel 15*'
      return
    }
    
    if (text.toLowerCase() === 'kantoran' && user.level < 20) {
     throw '*Pekerjaan ini hanya tersedia dilevel 20*'
      return
    }
    
   if (text.toLowerCase() === 'dokter' && user.level < 30) {
     throw '*Pekerjaan ini hanya tersedia dilevel 30*'
      return
    }

   if (text.toLowerCase() === 'frontend developer' && user.level < 40) {
     throw '*Pekerjaan ini hanya tersedia dilevel 40*'
      return
    }
   
   if (text.toLowerCase() === 'web developer' && user.level < 50) {
     throw '*Pekerjaan ini hanya tersedia dilevel 50*'
      return
    }
   
   if (text.toLowerCase() === 'backend developer' && user.level < 60) {
     throw '*Pekerjaan ini hanya tersedia dilevel 60*'
      return
    }
    
    if (text.toLowerCase() === 'fullstack developer' && user.level < 70) {
     throw '*Pekerjaan ini hanya tersedia dilevel 70*'
      return
    }

    if (text.toLowerCase() === 'game developer' && user.level < 80) {
     throw '*Pekerjaan ini hanya tersedia dilevel 80*'
      return
    }
    
   if (text.toLowerCase() === 'pemain sepak bola' && user.level < 90) {
     throw '*Pekerjaan ini hanya tersedia dilevel 90*'
      return
    }
    
    if (text.toLowerCase() === 'trader' && user.level < 100) {
     throw '*Pekerjaan ini hanya tersedia dilevel 100*'
      return
    }
    if (text.toLowerCase() === 'hunter' && user.level < 100) {
     throw '*Pekerjaan ini hanya tersedia dilevel 100*'
      return
    }
    
    if (text.toLowerCase() === 'polisi' && user.level < 150) {
     throw '*Pekerjaan ini hanya tersedia dilevel 150*'
      return
    }

   if (!text ||  !['gojek', 'kantoran', 'hunter', 'dokter', 'polisi', 'game developer', 'backend developer', 'web developer', 'sopir', 'kurir', 'frontend developer', 'fullstack developer', 'pemain sepak bola', 'karyawan indomaret', 'trader'].includes(text.toLowerCase())) {
   
    let kerjaan = `Contoh pemakaian: ${usedPrefix}${command} gojek

➥ Berikut adalah daftar pekerjaan yang tersedia

◦ Gojek
◦ Kurir
◦ Sopir
◦ Karyawan Indomaret
◦ Kantoran
◦ Dokter
◦ Frontend Developer
◦ Web Developer
◦ Backend Developer
◦ Fullstack Developer
◦ Game Developer
◦ Pemain Sepak Bola
◦ Trader
◦ Hunter
◦ Polisi

`.trim()
conn.reply(m.chat, kerjaan, m)
    return
  }
   let job = `${text}`
   let kapital = capitalizeFirstLetter(job)
    
   setTimeout(() => {
  let lamarkerja1 = `Kamu telah memilih *${kapital}* sebagai pekerjaanmu
  
⋄ Tunggulah persetujuan dari pihak perusahaan agar diterima untuk bekerja.`.trim()
  conn.reply(m.chat, lamarkerja1, m)}, 0)

setTimeout(() => {
  let lamarkerja2 = `🎉 Selamat, lamaran kerja kamu telah diterima oleh pihak perusahaan dan sekarang kamu dapat memulai untuk bekerja hari ini.
  
⋄ Ketik */job* untuk melihat detail pekerjaan.`.trim()
  conn.reply(m.chat, lamarkerja2, m)}, 30000)

setTimeout(() => {
    db.users.update(m.sender, (user) => {
    user.job = text.toLowerCase()
   })
}, 30000)

}

jarspy.help = ['lamarkerja']
jarspy.tags = ['roleplay']
jarspy.command = /^lamarkerja$/i

export default jarspy

function capitalizeFirstLetter(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(" ");
}