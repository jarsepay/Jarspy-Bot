/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let cooldown = 2592000000;

let jarspy = async (m, { isPrems }) => {
    let user = await db.users.get(m.sender)
    
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
    let rewards = {
        potion: 150,
        exp: 50000,
        money: 2000,
    }
    if (user.level >= 30) {
        rewards = {
            potion: 300,
            exp: 100000,
            money: 10 / 100 * user.money,
        }
    }
    
    if (new Date - user.lastmonthly < cooldown) throw `Kamu telah mengambil hadiah bulanan ini, tunggu hingga *${((user.lastmonthly + cooldown) - new Date()).toTimeString()}*`
    let text = ''
    for (let reward of Object.keys(rewards)) {
        if (reward in user) {
            await db.users.update(m.sender, (userData) => {
                userData[reward] += rewards[reward]
            })
            text += `*+${toSimple(rewards[reward])}* ${rpg.emoticon(reward)}${reward}\n`
        }
    }
    m.reply(text.trim())
    await db.users.update(m.sender, (userData) => {
        userData.lastmonthly = new Date() * 1
    })
}
jarspy.help = ['monthly']
jarspy.tags = ['rpg']
jarspy.command = /^(monthly)$/i

jarspy.cooldown = cooldown

export default jarspy

function toSimple(number) {
    if (isNaN(parseFloat(number))) return number;
    if (parseFloat(number) === 0) return '0';
    number = parseFloat(number).toFixed(0);
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui'];
    const base = 1000;
    const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
    const suffix = suffixes[exponent] || '';
    const simplified = number / Math.pow(base, exponent);
    const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
    return formatter.format(simplified) + suffix;
}