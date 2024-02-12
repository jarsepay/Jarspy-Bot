/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn }) => {
    let user = await db.users.get(m.sender)
    
    if (user.warn === 4) {
    db.users.update(m.sender, (user) => {
    user.banned = true
    })
    conn.reply(m.chat, 'Warn kamu mencapai 4 dan kamu telah di ban', m)
    return
    }
    let str = `*▸ Warn* ${user.nama} *:* ${user.warn} / 4
`.trim()
    conn.reply(m.chat, str, m)
}
jarspy.help = [`cekwarn`]
jarspy.tag = ['info']
jarspy.command = /^(cekwarn|cekwarning)$/i

export default jarspy