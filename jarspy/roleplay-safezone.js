/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

const cooldown = (isPrems) => (isPrems ? 3600000 : 43200000);

let jarspy = async (m, { conn, args, text, usedPrefix, command, isPrems, isROwner }) => {
  let user = await db.users.get(m.sender);

  if (new Date() - user.lastsafezone < cooldown(isPrems) && !isROwner && user.safezone == false) {
    throw `Kamu baru saja meninggalkan zona aman\nTunggu selama *${((user.lastsafezone + cooldown(isPrems)) - new Date()).toTimeString()}* untuk memasuki zona aman`;
  }

  if (user.safezone === false) {
    await db.users.update(m.sender, (user) => {
      user.safezone = true;
      user.lastsafezone = new Date() * 1;
    });
    m.reply(`Kamu sekarang berada di zona aman`);
  } else {
    await db.users.update(m.sender, (user) => {
      user.safezone = false;
    });
    m.reply(`Kamu telah meninggalkan zona aman`);
  }
};
jarspy.help = ['safezone'];
jarspy.tags = ['roleplay'];
jarspy.command = /^(safezone)$/i;

jarspy.cooldown = cooldown;

export default jarspy;