import similarity from 'similarity' 
import db from '../lib/database/index.js'

const threshold = 0.72 
export async function before(m, { conn, text, usedPrefix, command }) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hbol/i.test(m.quoted.text) || /.*hbol/i.test(m.text)) 
         return true
     this.tebakpemain = this.tebakpemain ? this.tebakpemain : {} 
     if (!(id in this.tebakpemain)) 
         return conn.reply(m.chat, `Soal itu telah berakhir.`, m) 
     if (m.quoted.id == this.tebakpemain[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebakpemain[id][3]) 
             delete this.tebakpemain[id] 
             return conn.reply(m.chat, '🏳️ Menyerah',  m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebakpemain[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) { 
             const user = await db.users.get(m.sender)
      await db.users.update(m.sender, (user) => {
        user.exp += this.tebakpemain[id][2]
      })
             conn.reply(m.chat, `Jawaban Benar!\n+${this.tebakpemain[id][2]} XP`, m) 
             clearTimeout(this.tebakpemain[id][3]) 
             delete this.tebakpemain[id] 
         } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             conn.reply(m.chat, '❌ Salah!', m) 
     } 
     return true
} 
export const exp = 0