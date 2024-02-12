/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  let user = await db.users.get(m.sender)
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }

  if (!text || !['true', 'false'].includes(text.toLowerCase())) {
    m.reply(`
Silakan pilih opsi transfer:
- *True*  ✅
- *False*  ❌
Contoh pemakaian: *${usedPrefix}${command} true*
`.trim())
    return
  }

  // Set opsi transfer pengguna
  await db.users.update(m.sender, (user) => {
    user.settransfer = text.toLowerCase() === 'true' ? true : false
  })
  m.reply(`Opsi transfer berhasil diatur sebagai *${text}* ${text.toLowerCase() === 'true' ? '✅' : '❌'}.`)
}

jarspy.help = ['settransfer']
jarspy.tags = ['rpg']
jarspy.command = /^(settransfer|stf|settf)$/i

export default jarspy