/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async(m, { args, conn, text }) => {

let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : ''
  if (!who) {
    who = m.sender
  }
const user = await db.users.get(who)
const usar = await db.users.get(m.sender)
let job = `${user.job}`
let kapital = capitalizeFirstLetter(job)
let maxi = '50000%'

if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
if (user.job == '-') {
throw `Kamu belum punya pekerjaan! Lamar pekerjaan dengan mengetik */lamarkerja*`
    return
  }

if (user.job == 'gojek') {
let gojekthumb = 'https://telegra.ph/file/1bb2e5ff8e3b434b379dc.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah */ngojek*
`.trim()

conn.sendFile(m.chat, gojekthumb, 'gojek.jpg', caption, m)
   return
  }
  if (user.job == 'kurir') {
let kurirthumb = 'https://telegra.ph/file/64d8e80ee172257f1b8ca.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, kurirthumb, 'kurir.jpg', caption, m)
   return
  }
  if (user.job == 'sopir') {
let sopirthumb = 'https://telegra.ph/file/57f5f98cae56774fc398b.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, sopirthumb, 'sopir.jpg', caption, m)
   return
  }
  if (user.job == 'karyawan indomaret') {
let indomaretthumb = 'https://telegra.ph/file/59ccf16e7d753698b674b.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, indomaretthumb, 'indomaret.jpg', caption, m)
   return
  }
  if (user.job == 'kantoran') {
let kantoranthumb = 'https://telegra.ph/file/1b2398b334d1cc7a74cb0.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, kantoranthumb, 'kantoran.jpg', caption, m)
   return
  }
  if (user.job == 'dokter') {
let dokterthumb = 'https://telegra.ph/file/951334d75d222eb7fa1b3.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah */healing*
`.trim()

conn.sendFile(m.chat, dokterthumb, 'dokter.jpg', caption, m)
   return
  }
  if (user.job == 'frontend developer') {
let frontendthumb = 'https://telegra.ph/file/3b28a547ba457c1681544.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, frontendthumb, 'frontend.jpg', caption, m)
   return
  }
  if (user.job == 'web developer') {
let webthumb = 'https://telegra.ph/file/dae4c03250e6c43e92a72.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, webthumb, 'webdev.jpg', caption, m)
   return
  }
  if (user.job == 'backend developer') {
let backendthumb = 'https://telegra.ph/file/ccc87e4468bf754d312cb.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, backendthumb, 'backend.jpg', caption, m)
   return
  }
  if (user.job == 'fullstack developer') {
let fullstackthumb = 'https://telegra.ph/file/1c8111cef2063b9db5d66.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, fullstackthumb, 'fullstack.jpg', caption, m)
   return
  }
  if (user.job == 'game developer') {
let gamethumb = 'https://telegra.ph/file/e621f007affe38df8e748.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, gamethumb, 'game.jpg', caption, m)
   return
  }
  if (user.job == 'pemain sepak bola') {
let footballthumb = 'https://telegra.ph/file/5a72645b7cd852b87493d.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, footballthumb, 'football.jpg', caption, m)
   return
  }
  if (user.job == 'trader') {
let traderthumb = 'https://telegra.ph/file/ed5c581836d61c70298bd.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah *-*
`.trim()

conn.sendFile(m.chat, traderthumb, 'trader.jpg', caption, m)
   return
  }
if (user.job == 'hunter') {
let hunterthumb = 'https://telegra.ph/file/2ba7ade78cbd36e3f35a4.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah */berburu, /gunshop, /kandang,* dan */weapon*
`.trim()

conn.sendFile(m.chat, hunterthumb, 'hunter.jpg', caption, m)
   return
  }
if (user.job == 'polisi') {
let polisithumb = 'https://telegra.ph/file/d34aa031a8035e13b5bbb.jpg'
let caption = `*JOB INFO*
🛠️ Pekerjaan : ${kapital}
🧤 Tingkat Kerja Keras : ${user.jobexp}% / ${maxi}

Tingkat kerja keras akan meningkat setiap 1% melalui perintah */kerja*. Dan command spesial kamu adalah */penjara* & */outjail*
`.trim()

conn.sendFile(m.chat, polisithumb, 'polisi.jpg', caption, m)
   return
  }
}

jarspy.help = ['job']
jarspy.tags = ['roleplay']
jarspy.command = /^(job)$/i

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