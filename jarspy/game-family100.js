/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { family100 } from '@bochilteam/scraper'
import db from '../lib/database/index.js'
const winScore = 4999
async function jarspy(m, { conn, text }) {

  const user = await db.users.get(m.sender)
  if (user.nama == '-') {
    throw `Kamu harus mempunyai nama untuk memainkan game ini! Ketik */set nama <namamu>* untuk mendapatkan nama`
    return
  }
  
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini.', this.game[id].msg)
        throw false
    }
    const json = await family100()
    let caption = `
▢ *Soal:* ${json.soal}
⌕ Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${winScore} XP tiap jawaban benar
    `.trim()
    this.game[id] = {
        id,
        msg: await conn.reply(m.chat, caption, m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
jarspy.help = ['family100']
jarspy.tags = ['game']
jarspy.command = /^family100$/i

export default jarspy