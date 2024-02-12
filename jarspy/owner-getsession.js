import fs from 'fs'
import Connection from '../lib/connection.js'

let jarspy = async (m, { conn, text }) => {
    if (m.sender === `${global.nomorowner}@s.whatsapp.net`) {
    let sesi = await fs.readFileSync('./sessions/creds.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m })
    return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh ${namaowner}`, m)
}
jarspy.help = ['getsessi']
jarspy.tags = ['owner']
jarspy.command = /^(g(et)?ses?si(on)?(data.json)?)$/i

export default jarspy