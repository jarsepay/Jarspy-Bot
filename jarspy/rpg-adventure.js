/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let cooldown = 75000

let jarspy = async (m, { isPrems, usedPrefix }) => {
    const user = await db.users.get(m.sender)
    let timers = (cooldown - (new Date - user.lastadventure))
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.health < 20) return m.reply(`Untuk berpetualang, dibutuhkan sedikitnya 20 Darah!
Kamu bisa membeli darah ❤️ dengan ketik *${usedPrefix}buy potion <jumlah>*,
dan ketik *${usedPrefix}heal <jumlah>* untuk menggunakan potion
`.trim())
    if (new Date - user.lastadventure <= cooldown) return m.reply(`
Kamu sudah berpetualang, Harap tunggu *${timers.toTimeString()}*
`.trim())
    const rewards = reward(user)
    let text = 'Kamu telah berpetualang dan tersesat'
    await db.users.update(m.sender, (user) => {
        for (const lost in rewards.lost) if (user[lost]) {
            const total = rewards.lost[lost].getRandom()
            user[lost] -= total * 1
            if (total) text += `\n*${global.rpg.emoticon(lost)}${lost}:* ${total}`
        }
        text += '\n\nTapi kamu mendapat'
        for (const rewardItem in rewards.reward) if (rewardItem in user) {
            const total = rewards.reward[rewardItem].getRandom()
            user[rewardItem] += total * 1
            if (total) text += `\n*${global.rpg.emoticon(rewardItem)}${rewardItem}:* ${total}`
        }
        user.lastadventure = new Date * 1
    })
    await m.reply(text.trim())

}
jarspy.help = ['adventure', 'petualang']
jarspy.tags = ['rpg']
jarspy.command = /^(adventure|(ber)?petualang(ang)?)$/i

jarspy.cooldown = cooldown

export default jarspy

function reward(user = {}) {
    let rewards = {
        reward: {
            money: 51,
            exp: 71,
            trash: 21,
            potion: 1,
            rock: 1,
            wood: 1,
            string: 1,
            common: 1 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
            rare: [0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
                )).fill(0)
            ),
            mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
                new Array(8 - (
                    (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
                )).fill(0)
            ),
            legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(
                new Array(10 - (
                    (user.dog > 8 && user.dog) || 4
                )).fill(0)
            ),
            iron: [0, 0, 0, 1, 0, 0],
            gold: [0, 0, 0, 0, 0, 1, 0],
            diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0
                )).fill(0)
            ),
        },
        lost: {
            health: 101 - user.cat * 4,
            armordurability: (15 - user.armor) * 7
        }
    }
    return rewards
}