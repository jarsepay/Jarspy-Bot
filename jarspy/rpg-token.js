/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';
import Connection from '../lib/connection.js';

const { areJidsSameUser } = await import('@whiskeysockets/baileys');

let cooldown = 15000;

let jarspy = async (m, { isPrems, conn: _conn, conn }) => {
  let user = await db.users.get(m.sender);

  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
  if (user.safezone == true) return m.reply(`*Kamu masih di zona aman!*`);

  if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
      throw `Kamu harus teregistrasi, untuk itu ketik */set*`
      return
    }

  let silent = 1 
  if (user.silent != true) {
    silent = 4
  }
  let safezone = 1
  if (user.safezone == true) {
    safezone = 10
  }
  let extra = safezone * silent  
    
  const rewards = {
    token: 1 + user.gems,
  };
  if (new Date() - user.lasttoken < cooldown * extra) {
    const timeLeft = (user.lasttoken + cooldown * extra) - new Date();
    const waitTime = timeLeft < 1000 ? `*${timeLeft} milidetik(ms)*` : `*${(timeLeft / 1000).toFixed(1)} detik(s)*`;
    throw `Kamu baru saja mengambil token tadi. Tunggu selama ${waitTime}`;
  }
  let text = '';
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue;
    await db.users.update(m.sender, (user) => {
      user[reward] += rewards[reward];
    });
    text += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}${reward}\n`;
  }
  if (user.silent == false) {
    m.reply(text.trim());
  }
  await db.users.update(m.sender, (user) => {
    user.lasttoken = new Date() * 1;
  });
};
jarspy.help = ['token'];
jarspy.tags = ['rpg'];
jarspy.command = /^(token)$/i;

jarspy.cooldown = cooldown;

export default jarspy;