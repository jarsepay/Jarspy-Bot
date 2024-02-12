/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { isPrems, conn }) => {
  const user = await db.users.get(m.sender)
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (user.balancer < 1) {
    m.reply('Kamu tidak memiliki balancer!')
    return
  }

  if (user.balancer >= 1) {
    m.reply('Kekuatan kamu sudah merata!')
    await db.users.update(m.sender, (user) => {
      user.balancer -= 1
      user.defense = Math.floor((user.psychic + user.strength + user.defense) / 3)
      user.psychic = user.defense
      user.strength = user.defense
    })
    return
  }
}

jarspy.help = ['balance']
jarspy.tags = ['rpg']
jarspy.command = /^(balance)$/i

export default jarspy