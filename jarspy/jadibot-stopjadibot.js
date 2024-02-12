/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { areJidsSameUser } from '@whiskeysockets/baileys'
import Connection from '../lib/connection.js'

let jarspy = async (m, { conn: _conn, conn }) => {
  const parent = await Connection.conn
  if (areJidsSameUser(parent.user.id, conn.user.id) || areJidsSameUser(parent.user.id, _conn.user.id)) {
    m.reply('Kenapa tidak langsung ke terminalnya?')
    return
  } else if (!areJidsSameUser(parent.user.id, conn.user.id) || !areJidsSameUser(parent.user.id, _conn.user.id)) {
    const index = [...Connection.connections.entries()].findIndex(([_, { conn: _conn }]) => areJidsSameUser(conn.user.id, _conn.user.id))
    if (index == -1) throw '??'
    await conn.reply(m.chat, 'Done', m)
    conn.end()
    Connection.conns.delete(index)
  }
}

jarspy.help = ['berhenti', 'stop']
jarspy.tags = ['jadibot']
jarspy.command = /^(((berhenti|stop)jadibot)|stop)$/i
jarspy.owner = true

export default jarspy