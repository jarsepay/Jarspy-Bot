/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

export async function all(m) {
  if (m.isGroup) {
    let chats = await db.chats.get(m.chat);
    if (chats && chats.expired && +new Date() > chats.expired) {
      await this.reply(m.chat, `👋 Bot Akan Left ${sid}`);
      await this.groupLeave(m.chat);
      await db.chats.update(m.chat, (chat) => {
        chat.expired = -1;
      });
    }
  }
  
  const user = await db.users.get(m.sender);
  if (user && user.banned && user.bannedExpired !== -1 && +new Date() > user.bannedExpired) {
    await db.users.update(m.sender, (user) => {
      user.banned = false;
      user.bannedExpired = -1;
    });
  }
  if (user && user.jail && user.jailExpired !== -1 && +new Date() > user.jailExpired) {
    await db.users.update(m.sender, (user) => {
      user.jail = false;
      user.jailExpired = -1;
    });
  }
}