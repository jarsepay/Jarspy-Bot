/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { siapakahaku } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let jarspy = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini.', conn.siapakahaku[id][0])
        throw false
    }
    const json = await siapakahaku()
    // if (!json.status) throw json
    let caption = `
⌕ Siapakah aku? ${json.soal}

◦ Timeout *${(timeout / 1000).toFixed(2)} detik*
◦ Ketik ${usedPrefix}who untuk bantuan
◦ Bonus: ${poin} XP

Hint ➭ ${usedPrefix}who
`.trim()
    conn.siapakahaku[id] = [
        await conn.reply(m.chat, caption, m),
        //await conn.sendButton(m.chat, caption, author, ['hint', `${usedPrefix}who`], m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0])
            //if (conn.siapakahaku[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, ['siapahaku', '/siapakahaku'], conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
jarspy.help = ['siapakahaku']
jarspy.tags = ['game']
jarspy.command = /^siapa(kah)?aku/i

export default jarspy