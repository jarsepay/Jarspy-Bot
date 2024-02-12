import db from '../lib/database/index.js'

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
let usar = await db.users.get(m.sender)
if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  let user = await db.users.get(who)
  if (!who) throw 'Tag salah satu'
   let dapat = (Math.floor(Math.random() * 10000000))
   let nomors = m.sender
   let darah = user.health
   let __timers = (new Date - usar.lastkill)
   let _timers = (300000 - __timers) 
   let timers = clockString(_timers)
   if (new Date - usar.lastkill > 300000){
   if (user.money < 50000) throw '*Uang target terlalu dikit 💰. Minimal uang target adalah 50.000*'
   await db.users.update(m.sender, (usar) => {
   usar.money += dapat * 1
   usar.lastkill = new Date * 1
   })
   await db.users.update(who, (user) => {
   user.money -= dapat * 1
   user.health -= darah
   })
   conn.reply(m.chat, `Berhasil membunuh dan mengambil uang target sebesar 💰${dapat}`, m)
  } else conn.reply(m.chat, `Kamu sudah membunuh korban dan berhasil kabur dari kejaran polisi, tunggu ${timers} \nUntuk membunuh lagi`, m)
}
jarspy.help = ['membunuh']
jarspy.tags = ['rpg']
jarspy.command = /^(membunuh|kill)$/
jarspy.group = true
export default jarspy
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n ' + d, ' *Hari ☀️*\n ', h, ' *Jam 🕐*\n ', m, ' *Menit ⏰*\n ', s, ' *Detik ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')

}