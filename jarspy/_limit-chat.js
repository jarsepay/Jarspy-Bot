/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

const cooldown = 700;
const BANNED_TIME = 60 * 60 * 1000

export async function all(m) {
  let user = await db.users.get(m.sender);
  const prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
  let acaksocial = `${Math.floor(Math.random() * 50)}`

  if (user) {
    
    if (user.banned == true) {
        return
    }
    
    const lowercaseText = m.text.toLowerCase();

    if (
      !prefix.test(lowercaseText) && // Memeriksa apakah teks dimulai dengan prefix yang diabaikan
      (user.nama != '-' || user.gender != 'non-binary' || user.umur != '-')
    ) {
      await db.users.update(m.sender, (user) => {
        user.social += acaksocial * 1;
      });
    }

    if (
      !prefix.test(lowercaseText) &&
      (user.nama != '-' || user.gender != 'non-binary' || user.umur != '-') &&
      m.chat == idgc
    ) {
      await db.users.update(m.sender, (user) => {
        user.social += acaksocial * 1;
      });
    }
    
    if (prefix.test(lowercaseText) && (+new Date() <= user.lastcommand)) { 
        const timeLeft = ((user.lastcommand) - +new Date());
    	const waitTime = timeLeft < 1000 ? `*${timeLeft} milidetik*` : `*${(timeLeft / 1000).toFixed(1)} detik*`;
        m.reply(`Kamu baru saja memakai bot! Tunggu selama ${waitTime}`)
        await db.users.update(m.sender, (user) => {
            user.warn += 1;
        });
        return
    }
      
    if (user.warn > 0) {
        if (user.warn > 3 && prefix.test(lowercaseText)) {
            await db.users.update(m.sender, (user) => {
                user.social = Math.floor(user.social / 2);
                user.banned = true
                user.bannedExpired = Date.now() + BANNED_TIME
                user.warn = 0
            })
            m.reply(`Kamu diban sementara karena spam`)
            return
        } else {
            await db.users.update(m.sender, (user) => {
                user.warn = 0
            })
        }
    }
      
    if (prefix.test(lowercaseText) && (user.nama != '-' || user.gender != 'non-binary' || user.umur != '-')) {
        await db.users.update(m.sender, (user) => {
            user.lastcommand = +new Date() + cooldown;
        });
    }
  }
}