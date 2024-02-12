import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
import Connection from '../lib/connection.js'
let exec = promisify(_exec).bind(cp)
let jarspy = async (m, { conn, isOwner, command, text }) => {
  if (m.sender === `${global.nomorowner}@s.whatsapp.net`) {
  if (conn.user.jid != conn.user.jid) return
  m.reply('Executing...')
  let o
  try {
    o = await exec(command.trimStart()  + ' ' + text.trimEnd())
  } catch (e) {
    o = e
  } finally {
    let { stdout, stderr } = o
    if (stdout.trim()) m.reply(stdout)
    if (stderr.trim()) m.reply(stderr)
  }
  return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh ${namaowner}`, m)
}
jarspy.customPrefix = /^[$] /
jarspy.command = new RegExp

export default jarspy