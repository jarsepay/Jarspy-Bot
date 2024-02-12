import db from '../lib/database/index.js'

let jarspy = async (m, { conn }) => { 
     let user = await db.users.get(m.sender)
     let __timers = (new Date - user.lastngojek) 
     let _timers = (300000 - __timers) 
     let order = user.ngojek
     let timers = clockString(_timers)  
     let name = conn.getName(m.sender)   

       if (user.job == 'gojek') {
       if (new Date - user.lastngojek > 300000) {
let randomaku1 = `${Math.floor(Math.random() * 10)}` 
let randomaku2 = `${Math.floor(Math.random() * 10)}` 
let randomaku4 = `${Math.floor(Math.random() * 5)}` 
let randomaku3 = `${Math.floor(Math.random() * 10)}` 
let randomaku5 = `${Math.floor(Math.random() * 10)}` 
.trim() 

let rbrb1 = (randomaku1 * 2) 
let rbrb2 = (randomaku2 * 10)  
let rbrb3 = (randomaku3 * 1) 
let rbrb4 = (randomaku4 * 38882) 
let rbrb5 = (randomaku5 * 120) 
  
var zero1 = `${rbrb1}` 
var zero2 = `${rbrb2}` 
var zero3 = `${rbrb3}` 
var zero4 = `${rbrb4}` 
var zero5 = `${rbrb5}` 

var dimas = ` 
🚶⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️       🛵
✔️ Mendapatkan orderan....
` 

var dimas2 = ` 
🚶🛵⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️
➕ Mengantar ke tujuan....
` 

var dimas3 = ` 
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️
➕ Sampai di tujuan....
` 
 
var dimas4 = ` 
⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛
⬛⬛⬛⬛⬛⬛⬛🛵⬛⬛
🏘️🏘️🏘️🏘️🌳  🌳 🏘️ 🚶
➕ 💹Menerima gaji....
`
 
var hsl = ` 
*—[ Hasil Ngojek ${name} ]—*
➕ 💹 Uang = [ ${zero4} ]
➕ ✨ Exp = [ ${zero5} ]
➕ 🧤 Tingkat Kerja Keras = +1
➕ 👍 Order Selesai = +1
➕ 📥 Total Order Sebelumnya : ${order}

${namabot}
`
setTimeout(() => {
db.users.update(m.sender, (user) => {
user.money += rbrb4
user.exp += rbrb5
user.jobexp += 1
})}, 100000)
setTimeout(() => {
m.reply(`${hsl}`)}, 100000)
setTimeout(() => {
m.reply(`${dimas4}`)}, 80000)
setTimeout(() => {
m.reply(`${dimas3}`)}, 60000)
setTimeout(() => {
m.reply(`${dimas2}`)}, 40000)
setTimeout(() => {
m.reply(`${dimas}`)}, 20000)
setTimeout(() => {
m.reply('🔍 Mencari pelanggan.....')}, 0)
setTimeout(() => {
db.users.update(m.sender, (user) => {
user.lastngojek = new Date * 1
})}, 0)
                      
     } else conn.reply(m.chat, `Sepertinya kamu sudah lelah, silahkan istirahat dulu sekitar\n🕔 *${timers}*`, m)
     return
   }
   await conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai gojek', m)
}
jarspy.help = ['ngojek'] 
jarspy.tags = ['roleplay'] 
jarspy.command = /^(ojek|ngojek|gojek|jadiojek)$/i 
  
export default jarspy

function clockString(ms) { 
   let h = Math.floor(ms / 3600000) 
   let m = Math.floor(ms / 60000) % 60 
   let s = Math.floor(ms / 1000) % 60 
   console.log({ms,h,m,s}) 
   return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':') 
 }