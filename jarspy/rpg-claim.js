/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

let cooldown = 3600000;

let jarspy = async (m, { isPrems }) => {
  const user = await db.users.get(m.sender);
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  
  let rewards = {
    limit: 20,
  };
  if (user.level >= 100) {
    rewards = {
      limit: 100,
    };
  }
  
  if (new Date - user.lastclaim < cooldown) throw `Kamu sudah mengambil limit gratis ini. Tunggu selama *${((user.lastclaim + cooldown) - new Date()).toTimeString()}*`

  let text = '';
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue;
    user[reward] += rewards[reward];
    text += `*+${toSimple(rewards[reward])}* ${global.rpg.emoticon(reward)}${reward}\n`;
  }

  m.reply(text.trim());
  user.lastclaim = new Date() * 1;

  await db.users.update(m.sender, (userData) => {
    Object.assign(userData, user);
  });
};

jarspy.help = ['claim'];
jarspy.tags = ['rpg'];
jarspy.command = /^(claim)$/i;

jarspy.cooldown = cooldown;

export default jarspy;

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