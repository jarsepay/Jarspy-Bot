import similarity from 'similarity'
import db from '../lib/database/index.js'

const threshold = 0.72
export async function before(m, { conn }) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*calo/i.test(m.quoted.text) || /.*(calo|bantuan)/i.test(m.text))
        return !0
    this.caklontong = this.caklontong ? this.caklontong : {}
    if (!(id in this.caklontong))
        return m.reply('Soal itu telah berakhir.')

    const user = await db.users.get(m.sender)
    if (m.quoted.id == this.caklontong[id][0].id) {
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.caklontong[id][3]) 
             delete this.caklontong[id] 
             return conn.reply(m.chat, '🏳️ Menyerah', m) 
         } 
        let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            await db.users.update(m.sender, (user) => {
                user.exp += this.caklontong[id][2]
            })
            await this.reply(m.chat, `Jawaban Benar! +${this.caklontong[id][2]} XP\n${json.deskripsi}`, m)
            //await this.sendButton(m.chat, `*Benar!* +${this.caklontong[id][2]} XP\n${json.deskripsi}`, author, null, [['Cak Lontong', '.caklontong']], m)
            clearTimeout(this.caklontong[id][3])
            delete this.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply('Sedikit lagi!')
        else
            m.reply('❌ Salah!')
    }
    return !0
}

export const exp = 0