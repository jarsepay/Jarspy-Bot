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

let cooldown = isPrems => isPrems ? 120000 : 180000

let jarspy = async (m, { isPrems, conn: _conn, conn }) => {
  let user = await db.users.get(m.sender)

  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
  if (!user.pickaxe || user.pickaxe < 1) {
    throw 'Kamu tidak memiliki pickaxe untuk melakukan mining ⛏️'
  }

  if (user.ironore + user.goldore + user.diamondore + user.ancientdebris > 30 * user.chest) {
    m.reply(`Kamu tidak memiliki inventory yang cukup untuk mining! ⛏️`)
    return
  }

  if (new Date() - user.lastmining < cooldown(isPrems)) throw `Kamu masih harus menunggu *${((user.lastmining + cooldown(isPrems)) - new Date()).toTimeString()}* sebelum melakukan mining ⛏️ lagi`

  let ores = {
    ironore: 90,
    goldore: 7,
    diamondore: 2,
    ancientdebris: 1
  }

  let totalChance = 0
  for (let ore of Object.keys(ores)) {
    totalChance += ores[ore]
  }

  let randomNumber = Math.random() * totalChance
  let oreResult = ''
  let currentChance = 0

  for (let ore of Object.keys(ores)) {
    currentChance += ores[ore]
    if (randomNumber < currentChance) {
      oreResult = ore
      break
    }
  }

  await db.users.update(m.sender, user => {
    user[oreResult] = (user[oreResult] || 0) + 1

    let message = `🎉 Selamat! Kamu mendapatkan 1 ${oreResult} ${global.rpg.emoticon(oreResult)}dari mining ⛏️\n\n`
    message += `⛰️ Ore saat ini:\n`
    for (let ore of Object.keys(ores)) {
      message += `• ${global.rpg.emoticon(ore)}${ore}: ${user[ore] || 0}\n`
    }

    let durabilityIncrease = Math.floor(Math.random() * 3) + 1
    user.pickaxedurability = (user.pickaxedurability || 0) + durabilityIncrease

    if (user.pickaxedurability >= 75) {
      if (user.pickaxe > 0) {
        user.pickaxe -= 1
      }
      user.pickaxedurability = 0
    }

    message += `\n🔋 Durability Pickaxe yang dipakai: ${user.pickaxedurability}/75`
    message += `\n⛏️ Jumlah Pickaxe yang tersisa: ${user.pickaxe || 0}`

    user.lastmining = new Date() * 1

    conn.reply(m.chat, message, m)
  })
}

jarspy.help = ['mining']
jarspy.tags = ['rpg']
jarspy.command = /^mining$/i

jarspy.cooldown = cooldown

export default jarspy