/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args }) => {
    if (!args || !args[0]) throw 'Siapa yang mau di warn?'
    let mention = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!mention) throw 'Tag salah satu atau ketik nomornya'
    let user = await db.users.get(mention)
    let _user = await db.users.get(m.sender)
    if (user.banned === true) {
    throw 'User ini sudah terbanned!'
    return
    }
    if ((user.warn * 1) < 3) {
    db.users.update(mention, (user) => {
        user.warn += 1
        })
        conn.reply(m.chat, 'Berhasil Warn', m)
        setTimeout(() => {
        conn.reply(mention, `Kamu di warn oleh ${_user.nama}, dan sekarang kamu memiliki *` + (user.warn + 1) + '* Warn. Perlu diingat jika kamu mendapat 4 warn, kamu akan otomatis di banned dari bot', m)
        }, 5000)
    } else if ((user.warn * 1) > 2) {
        db.users.update(mention, (user) => {
        user.banned = true
        user.warn = 0
        })
        conn.reply(m.chat, '*Pengguna ini akan segera dibanned, karena telah mendapatkan 4 warn*', m)
        setTimeout(() => {
        conn.reply(mention, '*Kamu dibanned karena telah mendapatkan 4 kali warn*\n *HUBUNGI* \n' + global.owner.map((v, i) => '*Admin ' + (i + 1) + ':* wa.me/' + v).join('\n'), m)
        }, 5000)
    }
}

jarspy.help = ['warn']
jarspy.tags = ['owner']
jarspy.command = /^warn(user)?$/i
jarspy.rowner = true
jarspy.owner = true

export default jarspy
