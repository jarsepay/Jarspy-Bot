/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';
import Connection from '../lib/connection.js';
import { areJidsSameUser } from '@whiskeysockets/baileys';

let cooldown = isPrems => isPrems ? 3750 : 15000;

const rewards = {
  uncommon: {
    rock: 8,
    string: 23,
    trash: 38,
    rare: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  common: {
    iron: 4,
    rock: 75,
    trash: 118,
    wood: 130,
    rare: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  rare: {
    iron: 3,
    gold: 1,
    diamond: 4,
    wood: 350,
    string: 500,
    trash: 60,
    legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  mythical: {
    orb: 2,
    emerald: 3,
    diamond: 85,
    sphere: 4,
    legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  legendary: {
    elixir: [0, 1],
    sphere: 45,
    diamond: 3100,
    orb: 8,
    car: Array(999).fill(0).concat(1),
    ancient: Array(99).fill(0).concat(1)
  },
  ancient: {
    money: 30000,
    exp: 45,
    limit: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    mythical: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    telephone: Array(999).fill(0).concat(1),
    smartphone: Array(999).fill(0).concat(1),
    luck: Array(99).fill(0).concat(1)
  }
};

let jarspy = async (m, { isPrems, text, command, args, usedPrefix, conn: _conn, __dirname, conn }) => {
  const user = await db.users.get(m.sender);

  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  
  if (user.safezone === true) {
    return m.reply(`Kamu tidak bisa gacha dari zona aman`);
  }
  
  if (new Date() - user.lastopen < cooldown) {
    throw `Kamu baru saja buka crate 📤 Tunggu selama *${((user.lastopen + cooldown) - new Date()).toTimeString()}*`;
  }

  let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user));
  let info = `
Contoh pemakaian: *${usedPrefix}${command} common 10*

▢ Daftar Peti: 
${Object.keys(listCrate).map((v) => `
${rpg.emoticon(v)}${v}
`.trim()).join('\n')}
`.trim();
  let type = (args[0] || '').toLowerCase();
  let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1;
  if (!(type in listCrate)) {
    return m.reply(info);
  }
  if (user[type] < count) {
    return m.reply(`
*${rpg.emoticon(type)}${type} Peti kamu* tidak cukup! Kamu hanya punya ${user[type]} *${rpg.emoticon(type)}${type} peti*.
Ketik *${usedPrefix}buy ${type} ${count - user[type]}* untuk membeli.
`.trim());
  }
  if (user.maxcrate < count && isPrems === false) {
    return m.reply(`
*${rpg.emoticon(type)}${type} peti* yang kamu buka kebanyakan!
Maksimal buka ${user.maxcrate} *${rpg.emoticon(type)}${type} peti*
Ketik ${usedPrefix}cbuy maxcrate untuk meningkatkan max open 🔼
`.trim());
  } else if (user.maxcrate * 10 < count && isPrems === true) {
    return m.reply(`
*${rpg.emoticon(type)}${type} peti* yang kamu buka kebanyakan!
Maksimal buka ${user.maxcrate * 10} *${rpg.emoticon(type)}${type} crate*
Ketik ${usedPrefix}buy maxcrate untuk meningkatkan max open 🔼
`.trim());
  }
  if (user.click < 10) {
    return m.reply(`
Untuk open crate, dibutuhkan sedikitnya 10 🤳🏿 click!
Kamu bisa mendapatkan click 🤳🏿 dengan mengetik *${usedPrefix}click*
`.trim());
  }

  let crateReward = {};
  for (let i = 0; i < count; i++) {
    for (let [reward, value] of Object.entries(listCrate[type])) {
      if (reward in user) {
        const total = value.getRandom();
        if (total) {
          await db.users.update(m.sender, (user) => {
            user[reward] += total * 1;
          });
          crateReward[reward] = (crateReward[reward] || 0) + (total * 1);
        }
      }
    }
  }

  await db.users.update(m.sender, (user) => {
    user[type] -= count * 1;
    user.click -= 10;
  });

  if (user.silent === false) {
    m.reply(`Kamu telah membuka *${count}* ${global.rpg.emoticon(type)}${type} peti dan mendapatkan:
${Object.keys(crateReward).filter(v => v && crateReward[v]).map(reward => `
*${global.rpg.emoticon(reward)}${reward}:* ${crateReward[reward]}
`.trim()).join('\n')}
`.trim());
  }

  await db.users.update(m.sender, (user) => {
    user.lastopen = new Date() * 1;
  });
};

jarspy.help = ['open', 'gacha'];
jarspy.tags = ['rpg'];
jarspy.command = /^(open|buka|gacha)$/i;

jarspy.cooldown = cooldown;

export default jarspy;

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number === 'number' && !isNaN(number);
}