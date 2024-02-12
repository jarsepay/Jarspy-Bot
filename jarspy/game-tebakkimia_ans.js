import similarity from 'similarity' 
import db from '../lib/database/index.js'

const threshold = 0.72 
export async function before(m, { conn, text, usedPrefix, command }) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hkim/i.test(m.quoted.text) || /.*hkim/i.test(m.text)) 
         return true
     this.tebakkimia = this.tebakkimia ? this.tebakkimia : {} 
     if (!(id in this.tebakkimia)) 
         return conn.reply(m.chat, `Soal itu telah berakhir.`, m) 
     if (m.quoted.id == this.tebakkimia[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebakkimia[id][3]) 
             delete this.tebakkimia[id] 
             return conn.reply(m.chat, '🏳️ Menyerah',  m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebakkimia[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.unsur.toLowerCase().trim()) { 
             const user = await db.users.get(m.sender)
      await db.users.update(m.sender, (user) => {
        user.exp += this.tebakkimia[id][2]
      })
             conn.reply(m.chat, `Jawaban Benar!\n+${this.tebakkimia[id][2]} XP`, m) 
             clearTimeout(this.tebakkimia[id][3]) 
             delete this.tebakkimia[id] 
         } else if (similarity(m.text.toLowerCase(), json.unsur.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             conn.reply(m.chat, '❌ Salah!', m) 
     } 
     return true
} 
export const exp = 0