import similarity from 'similarity' 
import db from '../lib/database/index.js'

const threshold = 0.72 
export async function before(m, { conn, text, usedPrefix, command }) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hlir/i.test(m.quoted.text) || /.*hlir/i.test(m.text)) 
         return true
     this.tebaklirik = this.tebaklirik ? this.tebaklirik : {} 
     if (!(id in this.tebaklirik)) 
         return conn.reply(m.chat, `Soal itu telah berakhir.`, m) 
     if (m.quoted.id == this.tebaklirik[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebaklirik[id][3]) 
             delete this.tebaklirik[id] 
             return conn.reply(m.chat, '🏳️ Menyerah', m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebaklirik[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) { 
             const user = await db.users.get(m.sender)
      await db.users.update(m.sender, (user) => {
        user.exp += this.tebaklirik[id][2]
      })
             conn.reply(m.chat, `Jawaban Benar!\n+${this.tebaklirik[id][2]} XP`, m) 
             clearTimeout(this.tebaklirik[id][3]) 
             delete this.tebaklirik[id] 
         } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             conn.reply(m.chat, '❌ Salah!', m) 
     } 
     return true
} 
export const exp = 0