/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import Connection from '../lib/connection.js'

const { areJidsSameUser } = await import('@whiskeysockets/baileys')

let cooldown = 75000

let jarspy = async (m, { isPrems, conn: _conn, conn }) => {
  let user = await db.users.get(m.sender)

  let pengali = 1
  if (m.chat == idgc) {
    pengali = 2
  }

  let silent = 1 
  if (user.silent != true) {
    silent = 4
  }
  let safezone = 1
  if (user.safezone == true) {
    safezone = 10
  }
  let extra = safezone * silent   
  
  const rewards = {
    psychic: (1 * user.psychic_multiplier * user.psychic_multiplier_extra) * pengali,
  }
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (new Date() - user.lastpsychic < cooldown * extra) {
    const remainingTime = new Date(user.lastpsychic + cooldown * extra) - new Date()
    throw `Kamu baru saja selesai berdoa tadi. Tunggu selama *${remainingTime.toTimeString()}*`
  }
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  if (user.silent == false) {
    m.reply(text.trim())
  }
  user.lastpsychic = new Date() * 1
  await db.users.update(m.sender, user)
}
jarspy.help = ['pray']
jarspy.tags = ['rpg']
jarspy.command = /^(pray)$/i

jarspy.cooldown = cooldown

export default jarspy