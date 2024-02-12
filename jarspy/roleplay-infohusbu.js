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
const res = await googleImage(`${user.husbu} anime icons`)
let husbu = `${user.husbu}`
let kapital = capitalizeFirstLetter(husbu)

if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }

if (user.husbu == '-') {
        throw 'Kamu belum mempunyai husbu! Ketik */lamarhusbu* untuk melamar husbu'
      return
    }

if (user.kepercayaanhusbu < 10) {
    throw 'Kamu diputusin oleh husbumu karena kepercayaan husbumu berada dibawah 10%! Lamarlah husbu lain lagi.'
    await db.users.update(m.sender, (user) => {
    user.husbu = '-'
    })
    return
  }

let caption = `*HUSBU INFO*
🕺🏻 Nama Husbu: ${kapital}
💘 Kepercayaan Husbu: ${user.kepercayaanhusbu}% / 500%

${user.nama} dan ${kapital} adalah sepasang kekasih dengan kehidupan yang sangat bahagia. ${user.nama} beruntung sekali karena memilih husbu seperti ${kapital}. Semoga mereka selalu hidup bahagia

Dengan melakukan kencani, kamu dapat menambah kepercayaannya setiap 1%
`.trim()

conn.sendFile(m.chat, res.getRandom(), 'husbu.jpg', caption, m)

}

jarspy.help = ['husbuku']
jarspy.tags = ['roleplay']
jarspy.command = /^(husbuku)$/i

export default jarspy

function capitalizeFirstLetter(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }  
  return words.join(" ");
}