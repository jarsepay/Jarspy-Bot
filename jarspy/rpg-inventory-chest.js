/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

const inventory = {
  items: {
    gems: true,
    ironore: true,
    silver: true,
    goldore: true,
    light_gold: true,
    diamondore: true,
    crystal: true,
    ancientdebris: true,
    pickaxe: true,
  },
};

const jarspy = async (m, { conn, args, usedPrefix, isROwner }) => {
  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  let pengirim = who;
  if (!who || !isROwner) {
    who = m.sender;
    pengirim = m.sender;
  }
  const user = await db.users.get(who);
  const usar = await db.users.get(m.sender);

  if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (!user) return m.reply(`Pengguna ${who} tidak ada dalam database`);

  const items = Object.keys(inventory.items)
    .map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`)
    .filter(v => v)
    .join('\n')
    .trim();

  const caption = `
▢ *@${(pengirim || '').replace(/@s\.whatsapp\.net/g, '')}* Chest

*💼 Chest:* (${user.ironore + user.goldore + user.diamondore + user.ancientdebris}/${user.chest * 30})
${items}
`.trim();

  m.reply(caption, null, { mentions: [pengirim] });
};

jarspy.help = ['chest', 'harta'];
jarspy.tags = ['rpg'];
jarspy.command = /^(chest|harta)$/i;
export default jarspy;

function toSimple(number) {
  if (isNaN(parseFloat(number))) return number;
  if (parseFloat(number) === 0) return '0';
  number = parseFloat(number).toFixed(0);
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg'];
  const base = 1000;
  const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[exponent] || '';
  const simplified = number / Math.pow(base, exponent);
  const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
  return formatter.format(simplified) + suffix;
}