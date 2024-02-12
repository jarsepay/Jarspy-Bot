import similarity from 'similarity' 
import db from '../lib/database/index.js'

const threshold = 0.72 
export async function before(m) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hcha/i.test(m.quoted.text) || /.*hcha/i.test(m.text)) 
         return !0 
     this.tebakchara = this.tebakchara ? this.tebakchara : {} 
     if (!(id in this.tebakchara)) 
         return this.reply(m.chat, 'Soal itu telah berakhir.', m) 
     if (m.quoted.id == this.tebakchara[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebakchara[id][3]) 
             delete this.tebakchara[id] 
             return this.reply(m.chat, '🏳️ Menyerah', m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebakchara[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.name.toLowerCase().trim()) { 
             const user = await db.users.get(m.sender)
             await db.users.update(m.sender, (user) => {
             user.exp += this.tebakchara[id][2]
             }) 
             this.reply(m.chat, `Jawaban Benar!\n+${this.tebakchara[id][2]} XP`, m) 
             clearTimeout(this.tebakchara[id][3]) 
             delete this.tebakchara[id] 
         } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             this.reply(m.chat, '❌ Salah!', m) 
     } 
     return !0 
} 
export const exp = 0 
  
const buttontebakchara = [ 
     ['tebakchara', '/tebakchara'] 
 ]