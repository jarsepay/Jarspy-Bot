/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

let jarspy = async (m, { isPrems, conn, text, usedPrefix, command, args }) => {
  let who = '';
  if (m.mentionedJid && m.mentionedJid[0]) {
    who = m.mentionedJid[0];
  } else if (args[0]) {
    const input = args.join('').replace(/[@ .+-]/g, '').replace(/^\+/, '').replace(/-/g, '');
    if (/^[a-zA-Z]+$/.test(input)) {
      who = '';
    } else {
      who = input + '@s.whatsapp.net';
    }
  } else {
    who = '';
  }

  if (!who) {
    who = m.sender;
  }
  
  const user = await db.users.get(who);
  const usar = await db.users.get(m.sender);
  if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (!user) {
    return m.reply(`Pengguna ${who} tidak ada dalam database`);
  }

  let kentangtime = 3600000 * 2;
  let burgertime = 3600000 * 14;
  let pizzatime = 3600000 * 24;

  if (!['burger', 'pizza', 'kentang'].includes(text.toLowerCase())) {
    return conn.reply(
      m.chat,
      `
🥩 Lambung *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* 🥩

Silakan pilih makanan yang tersedia:
- *Burger* 🍔 (+14 Jam)
- *Pizza* 🍕 (+24 Jam)
- *Kentang* 🍟 (+2 Jam)
Contoh: */eat burger*

🍴 Waktu sebelum mati kelaparan: *${((user.lasteat) - +new Date()).toTimeString()}*
`.trim(),
      null,
      { mentions: [who] }
    );
  }

  if (text.toLowerCase() === 'burger' && user.burger >= 1) {
    await db.users.update(who, (user) => {
      user.burger -= 1;
      user.lasteat = +new Date() + burgertime + (user.lasteat - +new Date());
    });
    conn.reply(m.chat, `🍔 Anda telah memakan burger.\nSisa burger: ${user.burger - 1}`, m);
  } else if (text.toLowerCase() === 'burger' && user.burger < 1) {
    conn.reply(m.chat, `Kamu tidak memiliki burger 🍔.\nBeli makanan di /foodshop`, m);
  }

  if (text.toLowerCase() === 'kentang' && user.kentang >= 1) {
    await db.users.update(who, (user) => {
      user.kentang -= 1;
      user.lasteat = +new Date() + kentangtime + (user.lasteat - +new Date());
    });
    conn.reply(m.chat, `🍟 Anda telah memakan Kentang.\nSisa Kentang: ${user.kentang - 1}`, m);
  } else if (text.toLowerCase() === 'kentang' && user.kentang < 1) {
    conn.reply(m.chat, `Kamu tidak memiliki Kentang 🍟.\nBeli makanan di /foodshop`, m);
  }

  if (text.toLowerCase() === 'pizza' && user.pizza >= 1) {
    await db.users.update(who, (user) => {
      user.pizza -= 1;
      user.lasteat = +new Date() + pizzatime + (user.lasteat - +new Date());
    });
    conn.reply(m.chat, `🍕 Anda telah memakan Pizza.\nSisa Pizza: ${user.pizza - 1}`, m);
  } else if (text.toLowerCase() === 'pizza' && user.pizza < 1) {
    conn.reply(m.chat, `Kamu tidak memiliki Pizza 🍕.\nBeli makanan di /foodshop`, m);
  }
};

jarspy.help = ['eat'];
jarspy.tags = ['rpg'];
jarspy.command = /^(eat)$/i;

export default jarspy;
