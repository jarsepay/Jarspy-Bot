/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let cooldown = 900000

let jarspy = async (m, { conn, command, text, usedPrefix, isPrems }) => {
    let user = await db.users.get(m.sender)
    
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
    if (new Date() - user.lastluck < cooldown) throw `Kamu Sudah Gacha ☘ Luck, Tunggu Selama *${((user.lastluck + cooldown) - new Date()).toTimeString()}*`
    
    await db.users.update(m.sender, (user) => {
        user.luck = (11).getRandom()
    })
    
    m.reply(`Luck Kamu: ${user.luck} ☘`)
    await db.users.update(m.sender, (user) => {
      user.lastluck = new Date() * 1
    })
}
jarspy.help = ['luck']
jarspy.tags = ['rpg']
jarspy.command = /^luck/i
jarspy.cooldown = cooldown

export default jarspy