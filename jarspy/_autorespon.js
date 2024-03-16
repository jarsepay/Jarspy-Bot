/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fs from 'fs'
let jarspy = m => m

jarspy.all = async function (m, { conn, isBlocked }) {
    if (isBlocked) return
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat.whatsapp.com') || m.text.startsWith('Undangan untuk bergabung') || m.text.startsWith('Invitation to join') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${global.namaowner};;;\nFN:${global.namaowner}\nORG:${global.namaowner}\nTITLE:\nitem1.TEL;waid=${global.nomorowner}:${global.nomorowner}\nitem1.X-ABLabel:${global.namaowner}\nX-WA-BIZ-DESCRIPTION:Ada Kendala? Chat Saya\nX-WA-BIZ-NAME:${global.namaowner}\nEND:VCARD`
  await this.sendMessage(m.chat, { contacts: { displayName: author, contacts: [{ vcard }] }, contextInfo: {
    forwardingScore: 100000,
    externalAdReply: {
     title: `Mau masukin ${global.namabot} ke grup kamu?`,
     body: `📞 Hubungi owner kami`,
     containsAutoReply: true,
     mediaType: 1,
     mediaUrl: thumbs, 
     renderLargerThumbnail: true,
     showAdAttribution: true,
     sourceUrl: sid,
     thumbnailUrl: thumbs
     }
   }}, m)
  }
}

export default jarspy