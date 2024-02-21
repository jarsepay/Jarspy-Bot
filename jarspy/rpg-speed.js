/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import Connection from '../lib/connection.js'
import { areJidsSameUser } from '@whiskeysockets/baileys'

let cooldown = 5000

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
    speed: (1 * user.speed_multiplier * user.speed_multiplier_extra) * pengali,
  }
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (new Date() - user.lastrun < cooldown * extra) throw `Kamu baru saja selesai berlari tadi. Tunggu selama *${((user.lastrun + cooldown * extra) - new Date()).toTimeString()}*`
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    await db.users.update(m.sender, (user) => {
      user[reward] += rewards[reward]
    })
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  if (user.silent == false) {
    m.reply(text.trim())
  }
  await db.users.update(m.sender, (user) => {
    user.lastrun = new Date() * 1
  })
}
jarspy.help = ['run']
jarspy.tags = ['rpg']
jarspy.command = /^(run)$/i

jarspy.cooldown = cooldown

export default jarspy