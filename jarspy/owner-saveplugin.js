import fs from 'fs' 
import Connection from '../lib/connection.js'
let jarspy = async (m, { conn, text, usedPrefix, command }) => {
   if (m.sender === `${global.nomorowner}@s.whatsapp.net`) {
   if (!text) throw `Contoh pemakaian:\n${usedPrefix + command} main-join` 
   if (!m.quoted.text) throw `balas pesan nya!` 
   let path = `jarspy/${text}.js` 
   await fs.writeFileSync(path, m.quoted.text) 
   m.reply(`*tersimpan di ${path}*`)
   return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh ${namaowner}`, m)
} 
jarspy.help = ['sfj']
jarspy.tags = ['owner'] 
jarspy.command = /^(sfp|sfj)$/i 

export default jarspy