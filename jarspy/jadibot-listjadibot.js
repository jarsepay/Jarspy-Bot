/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import Connection from '../lib/connection.js'
import ws from 'ws'

let jarspy = async (m, { conn, text, usedPrefix }) => {
    const users = [...new Set(
        [...Connection.connections.entries()]
            .filter(([_, { conn }]) => conn.user.jid && !conn.ws.isClosed)
            .map(([_, { conn }]) => conn.user)
    )]
    m.reply('Bot Asli : \n' + `- wa.me/${nomorbot}?text=/menu (${namabot})\n\n` + 'Bot Clone: (Total: ' + users.length + "/30)\n" + users.map((v, i) => (i + 1) + '. wa.me/' + v.jid.replace(/[^0-9]/g, '') + `?text=${usedPrefix}menu (${v.name})`).join('\n'))
}

jarspy.help = jarspy.tags = ['jadibot']

jarspy.command = /^(listjadibot|ljb|listbot|botlist)$/i

export default jarspy