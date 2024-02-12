import similarity from 'similarity' 
import db from '../lib/database/index.js'

const threshold = 0.72 
export async function before(m, { conn, text, usedPrefix, command }) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*htek/i.test(m.quoted.text) || /.*htek/i.test(m.text)) 
         return true
     this.tekateki = this.tekateki ? this.tekateki : {} 
     if (!(id in this.tekateki)) 
         return conn.reply(m.chat, `Soal itu telah berakhir.`, m) 
     if (m.quoted.id == this.tekateki[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tekateki[id][3]) 
             delete this.tekateki[id] 
             return conn.reply(m.chat, '🏳️ Menyerah', m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tekateki[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) { 
             const user = await db.users.get(m.sender)
      await db.users.update(m.sender, (user) => {
        user.exp += this.tekateki[id][2]
      })
             conn.reply(m.chat, `Jawaban Benar!\n+${this.tekateki[id][2]} XP`, m) 
             clearTimeout(this.tekateki[id][3]) 
             delete this.tekateki[id] 
         } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             conn.reply(m.chat, '❌ Salah!', m) 
     } 
     return true
} 
export const exp = 0