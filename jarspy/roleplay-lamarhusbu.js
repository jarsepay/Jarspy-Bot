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
  
  if (user.umur == '6' || user.umur == '7' || user.umur == '8' || user.umur == '9' || user.umur == '10' || user.umur == '11' || user.umur == '12' || user.umur == '13' || user.umur == '14' || user.umur == '15' || user.umur == '16') {
    throw `Kamu tidak bisa memilih husbu karena umurmu masih 16 tahun kebawah. Minimal 17 tahun agar bisa melamar husbu.`
    return
  }
  
  if (user.gender == 'male ♂️') {
    throw `Tidak bisa memilih husbu karena kamu berjenis kelamin pria!`
    return
  }

  if (user.level < 10) {
    throw `Kamu harus minimal level 10 agar bisa melamar husbu.`
    return
  }
  
  if (!text || !['uzumaki naruto', 'sasuke uchiha', 'shadow', 'kirigaya kazuto', 'gintoki sakata', 'itsuka shido'].includes(text.toLowerCase())) {
    throw `
Silakan pilih husbu anda:
- Gintoki Sakata
- Itsuka Shido
- Kirigaya Kazuto
- Sasuke Uchiha
- Shadow
- Uzumaki Naruto
Contoh pemakaian: *${usedPrefix}${command} Kirigaya Kazuto*
`.trim()
    return
  }

  let katanya = `${['Terima kasih, kamu telah membuatku merasa istimewa. Saya akan sangat senang untuk menjadi bagian dari hidupmu.', 'Ini adalah momen yang saya tunggu-tunggu. Saya menerimamu dengan hati terbuka.', 'Kamu adalah impian yang menjadi kenyataan dalam hidup saya. Saya bersedia menjadi milikmu selamanya.', 'Ketika kamu berlutut di hadapan saya, kamu juga merobek hati saya. Ya, saya mau.', 'Bersama-sama, kita akan menjalani petualangan yang indah. Saya menerima lamaranmu dengan sukacita.', 'Ini adalah jawaban dari hatiku yang paling dalam. Saya mencintaimu, dan saya akan menjadi milikmu.', 'Saya yakin bahwa kita adalah pasangan yang cocok. Saya menerimamu dengan cinta sejati.', 'Saya tak sabar untuk memulai babak baru dalam hidup bersamamu. Terima kasih telah menjadi bagian penting dalam cerita hidup saya.', 'Dalam dirimu, saya menemukan kebahagiaan sejati. Saya mau, dengan segenap hati.', 'Penerimaan ini adalah awal dari perjalanan kami bersama. Mari kita ciptakan kenangan yang tak terlupakan bersama-sama.'].getRandom()}`
  
  let husbu = `${text}`
  let kapital = capitalizeFirstLetter(husbu)
  setTimeout(() => {
  conn.reply(m.chat, `Kamu telah melamar ${kapital} untuk menjadi husbumu, tunggulah balasan darinya...`, m)}, 0)
  
  setTimeout(() => {
  conn.reply(m.chat, `Kamu mendapat balasan!
💭 ${kapital} mengatakan....
_"${katanya}"_`, m)}, 60000)
  setTimeout(() => {
  conn.reply(m.chat, `🥳 Lamaran kamu telah diterima oleh *${kapital}*, dan sekarang kalian memiliki status hubungan
  
Ketik */husbuku* untuk melihat detail husbu.`.trim(), m)}, 63000)

    setTimeout(() => {
    db.users.update(m.sender, (user) => {
     user.husbu = text.toLowerCase()
   })
   }, 63000)
   if (user.kepercayaanhusbu > 10) {
     db.users.update(m.sender, (user) => {
     user.kepercayaanhusbu = 10
   })
  } else if (user.kepercayaanhusbu < 10) {
     db.users.update(m.sender, (user) => {
     user.kepercayaanhusbu = 10
   })
   }
}
jarspy.help = ['lamarhusbu']
jarspy.tags = ['roleplay']
jarspy.command = /^lamarhusbu$/i

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