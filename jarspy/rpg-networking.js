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

let cooldown = 15000
let jarspy = async (m, { isPrems, conn: _conn, conn }) => {
  const user = await db.users.get(m.sender)
  
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
  let pengali = 1
  if (m.chat == idgc) {
      pengali = 2
  }
  
  let rewards = {
      gems: ((Math.floor(Math.random() * 9) + 2) * user.telephone) * pengali,
  }
  
  let reward_tambahkurang = "+"
  
  if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
       throw `Kamu harus teregistrasi, untuk itu ketik */set*`
       return
     }
    
  if (user.smartphone > 0) {
      rewards = {
          gems: ((Math.floor(Math.random() * 9) + 2) * user.telephone) * pengali,
          social: ((Math.floor(Math.random() * 8) - 2) * user.smartphone) * pengali,
      }
  }
    
  let extra = 1
  if (user.safezone == true) {
      extra = 10
  }
  
  if (new Date - user.lastnetworking < cooldown(isPrems) * extra) throw `Kamu sudah melakukan networking! Tunggu selama *${((user.lastnetworking + cooldown(isPrems) * extra) - new Date()).toTimeString()}*`

  if (Math.random() < 0.03 && user.telephone > 0) {
      await db.users.update(m.sender, (user) => {
        user.telephone = Math.floor(user.telephone / 2)
      })
      m.reply('Oh tidak! ☎️ Telepon kamu rusak')
  }
    
  if (Math.random() < 0.05 && user.smartphone > 0) {
      await db.users.update(m.sender, (user) => {
        user.smartphone = Math.floor(user.smartphone / 2)
      })
      m.reply('Oh no! 📱 Smartphone kamu rusak')
  }
  
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    await db.users.update(m.sender, (user) => {
      user[reward] += rewards[reward]
    })
    if (rewards[reward] < 0) {
        reward_tambahkurang = ''
    }
    text += `*${reward_tambahkurang}${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  if (user.silent == false) {
    m.reply(text.trim())
  }
  await db.users.update(m.sender, (user) => {
    user.lastnetworking = new Date() * 1
  })
}
jarspy.help = ['networking']
jarspy.tags = ['rpg']
jarspy.command = /^(networking|n)$/i

jarspy.cooldown = cooldown

export default jarspy