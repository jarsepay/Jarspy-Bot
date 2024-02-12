/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args }) => {
    if (!args || !args[0]) throw 'Siapa yang mau di unwarn?'
    let mention = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!mention) throw 'Tag salah satu atau ketik nomornya'
    let user = await db.users.get(mention)
    let _user = await db.users.get(m.sender)
    if (user.Banneduser) throw 'User ini telah dibanned!'
    if ((user.warn * 1) < 1) throw 'User ini tidak mempunyai warn'
    let count = (args[1] || args.length > 0 ? !isNaN(parseInt(args[1])) ? parseInt(args[1]) : 1 : 1) || 1
    if ((user.warn * 1) < count * 1) throw `User ini hanya memiliki *${user.warn}* Warn`
    db.users.update(mention, (user) => {
    user.warn -= count * 1
    })
    conn.reply(m.chat, 'Berhasil unwarn', m)
    setTimeout(() => {
    conn.reply(mention, `Kamu telah di unwarn oleh *${_user.nama}*, sekarang kamu memiliki *` + (user.warn) + '* Warn', m)
    }, 5000)
}

jarspy.help = ['unwarn']
jarspy.tags = ['owner']
jarspy.command = /^unwarn(user)?$/i
jarspy.rowner = true
jarspy.owner = true

export default jarspy
