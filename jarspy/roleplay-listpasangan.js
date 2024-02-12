/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import { getUserCache } from './_cache.js'

let jarspy = async (m) => {
  let users = getUserCache()

  let filteredUsers = []
  for (let user of users) {
    // Memeriksa apakah pengguna memiliki gender "male ♂️" dan pasangan yang tidak sama dengan "-"
    if (user.gender === "male ♂️" && user.partner !== "-") {
      filteredUsers.push(user)
    }
  }

  // Menampilkan daftar pengguna jika ada yang sesuai dengan kriteria
  if (filteredUsers.length > 0) {
    let nomorUrut = 1
    const daftarPengguna = filteredUsers.map((user) => {
      return `${nomorUrut++}. @${user.jid.replace(/@s\.whatsapp\.net/g, '')} | Pasangan: @${user.partner.replace(/@s\.whatsapp\.net/g, '')}`;
    }).join('\n')

    m.reply(`
⬡ Daftar pengguna dengan gender "male" yang memiliki pasangan:
⬡ Total orang: ${nomorUrut - 1}

${daftarPengguna}
`.trim(), null, { mentions: filteredUsers.map(user => user.jid) })

  } else {
    m.reply('Tidak ada pengguna dengan gender "male" yang memiliki pasangan.')
  }
}

jarspy.command = /^listpasangan$/i
jarspy.help = ['listpasangan']
jarspy.tags = ['roleplay']
jarspy.disabled = false

export default jarspy