/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

async function jarspy(m, { conn, usedPrefix, command }) {
    let user = await db.users.get(m.sender)
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.partner === '-') {
        return m.reply('Kamu tidak memiliki pasangan! Tidak ada hubungan yang bisa diputuskan.')
    }
    let _user = await db.users.get(user.partner)
    conn.reply(user.partner, `Kamu telah diputuskan oleh *@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')}*`, m, { mentions: [m.sender] })
    m.reply(`Kamu telah memutuskan hubungan dengan *@${(user.partner || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [user.partner] })

    await db.users.update(m.sender, (user) => {
        user.partner = '-'
    })
    await db.users.update(user.partner, (_user) => {
        _user.partner = '-'
    })
}

jarspy.help = ['putus']
jarspy.tags = ['roleplay']
jarspy.command = /^(putus)$/i

jarspy.disabled = false

export default jarspy