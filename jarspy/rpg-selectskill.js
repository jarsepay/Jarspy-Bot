import { googleImage } from '@bochilteam/scraper'
import db from '../lib/database/index.js'

let jarspy = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  const user = await db.users.get(m.sender)
  
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (user.strength < 100 || user.speed < 100 || user.defense < 100) {
    throw `Tidak dapat memilih skill karena kamu masih terlalu lemah! Minimal 100 Strength, Speed, dan Defense`
    return
  }

  if (!text || !['swordmaster', 'necromancer', 'witch', 'archer', 'magicswordmaster', 'thief', 'shadow'].includes(text.toLowerCase())) {
    throw `
Silakan pilih skill anda:
- Swordmaster
- Necromancer
- Witch
- Archer
- Magicswordmaster
- Thief
- Shadow
Contoh: *${usedPrefix}${command} Swordmaster*
`.trim()
    return
  }
  
  let skil = `${text}`
  let kapital = capitalizeFirstLetter(skil)
  setTimeout(() => {
  conn.reply(m.chat, `Kamu telah memilih ${kapital} sebagai skillmu, tunggulah beberapa saat untuk menciptakan kekuatan barumu...`, m)}, 0)
  
  setTimeout(() => {
  conn.reply(m.chat, `Kamu akhirnya berhasil!
🔥 Skill ${kapital} telah tercipta dan telah mengalir ke dalam tubuhmu`, m)}, 60000)
  setTimeout(() => {
   db.users.update(m.sender, (user) => {
    user.skill = text.toLowerCase()
  })
  }, 63000)
}
jarspy.help = ['pilihskill']
jarspy.tags = ['rpg']
jarspy.command = /^pilihskill$/i

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