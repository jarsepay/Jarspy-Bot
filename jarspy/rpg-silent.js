/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args, text, usedPrefix, command }) => {
    let user = await db.users.get(m.sender)
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.silent === false) {
        await db.users.update(m.sender, (user) => {
            user.silent = true
        })
        user = await db.users.get(m.sender)
        m.reply(`👥 Silent = *${user.silent}*`)
        return
    }
    if (user.silent === true) {
        await db.users.update(m.sender, (user) => {
            user.silent = false
        })
        user = await db.users.get(m.sender)
        m.reply(`👥 Silent = *${user.silent}*`)
        return
    }
}

jarspy.help = ['silent']
jarspy.tags = ['rpg']
jarspy.command = /^silent$/i

export default jarspy