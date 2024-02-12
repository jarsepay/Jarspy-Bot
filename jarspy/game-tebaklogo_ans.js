import similarity from 'similarity' 
import db from '../lib/database/index.js'

const threshold = 0.72 
export async function before(m) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hlog/i.test(m.quoted.text) || /.*hlog/i.test(m.text)) 
         return !0 
     this.tebaklogo = this.tebaklogo ? this.tebaklogo : {} 
     if (!(id in this.tebaklogo)) 
         return this.reply(m.chat, 'Soal itu telah berakhir.', m) 
     if (m.quoted.id == this.tebaklogo[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebaklogo[id][3]) 
             delete this.tebaklogo[id] 
             return this.reply(m.chat, '🏳️ Menyerah', m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebaklogo[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.hasil.data.jawaban.toLowerCase().trim()) { 
           const user = await db.users.get(m.sender)
           await db.users.update(m.sender, (user) => {
            user.exp += this.tebaklogo[id][2] 
            })
             this.reply(m.chat, `Jawaban Benar!\n+${this.tebaklogo[id][2]} XP`, m) 
             clearTimeout(this.tebaklogo[id][3]) 
             delete this.tebaklogo[id] 
         } else if (similarity(m.text.toLowerCase(), json.hasil.data.jawaban.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             this.reply(m.chat, '❌ Salah!', m) 
     } 
     return !0 
} 
export const exp = 0 
  
const buttontebaklogo = [ 
     ['tebaklogo', '/tebaklogo'] 
 ]