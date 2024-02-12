/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { googleImage } from '@bochilteam/scraper'
import db from '../lib/database/index.js'

let jarspy = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  const user = await db.users.get(m.sender)
  
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
    return
  }
  
  if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
    throw `Kamu harus teregistrasi, untuk itu ketik */set*`
    return
  }
  
  if (!text || !['las vegas', 'gubuk'].includes(text.toLowerCase())) {
    throw `
Silakan pilih lokasi anda:
- Gubuk (Rumah Awal)
- Las Vegas
Contoh pemakaian: *${usedPrefix}${command} Las Vegas*
`.trim()
    return
  }
  
  if (text.toLowerCase() === 'gubuk' && user.location !== 'gubuk') {
    conn.reply(m.chat, `Selamat datang kembali ke gubuk, ${user.nama}`, m)
    db.users.update(m.sender, (user) => {
      user.location = text.toLowerCase()
    })
    return
  }
  if (text.toLowerCase() === 'las vegas' && user.level < 20) {
    throw `Kamu harus minimal level 20 agar bisa pergi ke Las Vegas.`
    return
  }
    let lokasi = `${text}`
    let kapital = capitalizeFirstLetter(lokasi)
    conn.reply(m.chat, `Kamu telah berpindah lokasi ke ${kapital}`, m)
    db.users.update(m.sender, (user) => {
      user.location = text.toLowerCase()
    })
}
jarspy.help = ['pindah']
jarspy.tags = ['rpg']
jarspy.command = /^pindah$/i

export default jarspy

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");
  
  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}