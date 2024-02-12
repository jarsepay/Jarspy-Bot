import db from '../lib/database/index.js';

export async function before(m) {
  let user = await db.users.get(m.sender);
  if (user.afk > -1) {
    m.reply(`Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
Selama ${(new Date() - user.afk).toTimeString()}`.trim());
    await db.users.update(m.sender, (user) => {
      user.afk = -1;
      user.afkReason = '';
    });
  }
  
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
  for (let jid of jids) {
    let user = await db.users.get(jid);
    if (!user)
      continue;
    let afkTime = user.afk;
    if (!afkTime || afkTime < 0)
      continue;
    let reason = user.afkReason || '';
    m.reply(`Dia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
Selama ${(new Date() - afkTime).toTimeString()}`.trim());
  }
  
  return true;
}