/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { googleImage } from '@bochilteam/scraper'
import db from '../lib/database/index.js'

let jarspy = async(m, { args, conn, text }) => {
const user = await db.users.get(m.sender)
const res = await googleImage(`${user.waifu} anime icons`)
let waifu = `${user.waifu}`
let kapital = capitalizeFirstLetter(waifu)

if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
if (user.waifu == '-') {
        throw 'Kamu belum mempunyai waifu! Ketik */lamarwaifu* untuk melamar waifu'
      return
    }
  
if (user.kepercayaanwaifu < 10) {
    throw 'Kamu diputusin oleh waifumu karena kepercayaan waifumu berada dibawah 10%! Lamarlah waifu lain lagi.'
    await db.users.update(m.sender, (user) => {
    user.waifu = '-'
    })
    return
  }
  
let caption = `*WAIFU INFO*
💃🏻 Nama Waifu: ${kapital}
💘 Kepercayaan Waifu: ${user.kepercayaanwaifu}% / 500%

⋄ ${user.nama} dan ${kapital} adalah sepasang kekasih dengan kehidupan yang sangat bahagia. ${user.nama} adalah orang yang sangat beruntung karena mempunyai waifu seperti ${kapital}. Semoga mereka selalu hidup bahagia

Dengan melakukan kencan, kamu dapat menambah kepercayaannya setiap 1%
`.trim()

conn.sendFile(m.chat, res.getRandom(), 'waifu.jpg', caption, m)

}

jarspy.help = ['waifuku']
jarspy.tags = ['roleplay']
jarspy.command = /^(waifuku)$/i

export default jarspy

function capitalizeFirstLetter(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return words.join(" ");
}