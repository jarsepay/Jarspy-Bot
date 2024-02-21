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

let cooldown = 10000;
let jarspy = async (m, { isPrems, conn: _conn, conn }) => {
  let user = await db.users.get(m.sender);
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  const rewards = {
    click: 1 + user.gems,
  };

  if (new Date() - user.lastclick < cooldown) {
    throw `Kamu sudah melakukan click, tunggu selama *${((user.lastclickly + cooldown) - new Date()).toTimeString()}*`;
  }  

  let text = '';
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue;
    await db.users.update(m.sender, (user) => {
      user[reward] += rewards[reward];
    });
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`;
  }

  if (user.silent === false) {
    m.reply(text.trim());
  }

  await db.users.update(m.sender, (user) => {
    user.lastclick = new Date() * 1;
  });
};

jarspy.help = ['click'];
jarspy.tags = ['rpg'];
jarspy.command = /^(click)$/i;
jarspy.cooldown = cooldown;

export default jarspy;