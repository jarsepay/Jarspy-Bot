/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import { getUserCache } from './_cache.js';

let jarspy = async (m, { conn, text, usedPrefix, command, args }) => {
  // kode
  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  if (!who) {
    who = m.sender
  }
  //if (!(who in db.users.get)) return m.reply(`User ${who} tidak ada dalam database`)
  let user = await db.users.get(who);
  let users = getUserCache();

  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  let followers = users.filter(user => user.following.includes(who)).map(follower => Object.values(follower)[0].slice(0, -5));
    
  await db.users.update(who, (user) => {
      user.followers = followers.length
  })
  user = await db.users.get(who);

  if (command.toLowerCase() == 'followers') {
    m.reply(`
⋄ Nama: *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
⋄ Jumlah Pengikut: ${user.followers}

▢ Daftar Pengikut:
${followers.map((follower, index) => `${index + 1}. @${follower.split('@')[0]}`.trim()).join('\n')}
`.trim(), null, { mentions: [...followers, who] })
  }

  if (command.toLowerCase() == 'following') {
    m.reply(`
⋄ Nama: *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
⋄ Jumlah Mengikuti: ${user.following.length}

▢ Daftar Mengikuti:
${user.following.map((follower, index) => `${index + 1}. @${follower.split('@')[0]}`.trim()).join('\n')}
`.trim(), null, { mentions: [...user.following, who] })
  }
}

jarspy.help = ['followers']
jarspy.tags = ['roleplay']

jarspy.command = /^followers|following/i

export default jarspy