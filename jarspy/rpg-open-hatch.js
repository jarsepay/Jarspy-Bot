/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

const rewards = {
  pet: {
    ant: [1, 1],
    fox: Array(1).fill(0).concat(1),
    horse: Array(4).fill(0).concat(1),
    cat: Array(9).fill(0).concat(1),
    dog: Array(19).fill(0).concat(1),
    dragon:  Array(999).fill(0).concat(1),
    panda:  Array(9999).fill(0).concat(1),
  },
}

let jarspy = async (m, { command, args, usedPrefix }) => {
  let user = await db.users.get(m.sender)
  
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
  let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user))
  let info = `
Contoh pemakaian: *${usedPrefix}${command} pet 1*

▢ Daftar Peti:
${Object.keys(listCrate).map((v) => `
${rpg.emoticon(v)}${v}

🌫️ Rate:
- Ant 🐜 100%
- Fox 🦊 50%
- Horse 🐴 20%
- Cat 🐈 10%
- Dog 🐕 5%
- Dragon 🐉 0.1%
- Panda 🐼 0.01%
`.trim()).join('\n')}
`.trim()

  let type = (args[0] || '').toLowerCase()
  let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1

  if (!(type in listCrate)) return m.reply(info)
  if (user[type] < count) return m.reply(`
*${rpg.emoticon(type)}${type} Peti kamu* tidak cukup!, kamu hanya punya ${user[type]} *${rpg.emoticon(type)}${type} peti*
Ketik *${usedPrefix}buy ${type} ${count - user[type]}* untuk membeli
`.trim())

  if (1 < count) return m.reply(`
*${rpg.emoticon(type)}${type} peti* yang kamu buka kebanyakan!
Maksimal buka 1 *${rpg.emoticon(type)}${type} peti*
`.trim())

  if (user.click < 100) return m.reply(`
Untuk hatch box, dibutuhkan sedikitnya 100 🤳🏿 click
Anda bisa mendapatkan click 🤳🏿 dengan ketik *${usedPrefix}click*
`.trim())

  let crateReward = {}
  for (let i = 0; i < count; i++) {
    for (let [reward, value] of Object.entries(listCrate[type])) {
      if (reward in user) {
        const total = value.getRandom()
        if (total) {
          await db.users.update(m.sender, (user) => {
            user[reward] += total * 1
            crateReward[reward] = (crateReward[reward] || 0) + (total * 1)
          })
        }
      }
    }
  }

  await db.users.update(m.sender, (user) => {
    user[type] -= count * 1
    user.click -= 100
  })

  if (user.silent == false) {
    m.reply(`
Kamu telah menetaskan *${count}* ${global.rpg.emoticon(type)}${type} peti dan mendapatkan:
${Object.keys(crateReward).filter(v => v && crateReward[v] && !/legendary|pet|mythic|diamond|emerald/i.test(v)).map(reward => `
*${global.rpg.emoticon(reward)}${reward}:* ${crateReward[reward]}
`.trim()).join('\n')}
`.trim())
  }
}

jarspy.help = ['hatch']
jarspy.tags = ['rpg']
jarspy.command = /^(hatch)$/i

export default jarspy

function isNumber(number) {
  if (!number) return number
  number = parseInt(number)
  return typeof number == 'number' && !isNaN(number)
}