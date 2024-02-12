/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { caklontong } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let jarspy = async (m, { conn, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.caklontong[id][0])
    let json = await caklontong()
    let caption = `
⌕ ${json.soal}
◦ Timeout *${(timeout / 1000).toFixed(2)} detik*
◦ Ketik ${usedPrefix}calo untuk bantuan
◦ Bonus: ${poin} XP

Hint ➭ ${usedPrefix}calo
`.trim()
    conn.caklontong[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.caklontong[id]) await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`, conn.caklontong[id][0])
            //if (conn.caklontong[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`, author, null, [['Cak Lontong', `${usedPrefix}caklontong`]], conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
}
jarspy.help = ['caklontong']
jarspy.tags = ['game']
jarspy.command = /^caklontong/i

export default jarspy