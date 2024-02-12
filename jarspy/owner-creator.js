/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

let jarspy = async(m, { conn, groupMetadata }) => { 
  
   let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${global.namaowner};;;\nFN:${global.namaowner}\nORG:${global.namaowner}\nTITLE:\nitem1.TEL;waid=${global.nomorowner}:${global.nomorowner}\nitem1.X-ABLabel:${global.namaowner}\nX-WA-BIZ-DESCRIPTION:⚠️ NOTE: JANGAN SPAM\nX-WA-BIZ-NAME:${global.namaowner}\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: author, contacts: [{ vcard }] }}, { quoted: m })
  
 } 
jarspy.help = ['owner'] 
jarspy.tags = ['info'] 
jarspy.command = /^(owner|creator)$/i 
  
export default jarspy