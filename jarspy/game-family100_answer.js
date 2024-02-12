import similarity from 'similarity'
import db from '../lib/database/index.js'

const threshold = 0.72 // semakin tinggi nilai, semakin mirip
export async function before(m, { conn }) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (!(id in this.game))
        return true
    let room = this.game[id]
    let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
    if (!isSurrender) {
        let index = room.jawaban.indexOf(text)
        if (index < 0) {
            if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(jawaban => similarity(jawaban, text))) >= threshold)
                m.reply('Sedikit lagi!')
            return true
        }
        if (room.terjawab[index])
            return true
        let user = await db.users.get(m.sender)
        await db.users.update(m.sender, (user) => {
            user.exp += room.winScore
        })
        room.terjawab[index] = user.nama
    }
    let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
    let caption = `
▢ *Soal:* ${room.soal}
⌕ Terdapat *${room.jawaban.length}* jawaban${room.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)

Ketik "nyerah" untuk menyerah!
` : ''}
${isWin ? `*SEMUA JAWABAN TERJAWAB*` : isSurrender ? '*MENYERAH!*' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
        return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ~ (${room.terjawab[index] ? '' + room.terjawab[index] : '-'})`.trim() : false
    }).filter(v => v).join('\n')}
${isSurrender ? '' : `+${room.winScore} XP tiap jawaban benar`}
    `.trim()
    const msg = await this.reply(m.chat, caption, null, {
        mentions: this.parseMention(caption)
        })
    room.msg = msg
    if (isWin || isSurrender)
        delete this.game[id]
    return true
}