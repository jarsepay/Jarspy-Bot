import similarity from 'similarity' 
import db from '../lib/database/index.js'
const threshold = 0.72 
export async function before(m) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hsus/i.test(m.quoted.text) || /.*hsus/i.test(m.text)) 
         return !0 
     this.susunkata = this.susunkata ? this.susunkata : {} 
     if (!(id in this.susunkata)) 
         return this.reply(m.chat, 'Soal itu telah berakhir', m) 
     if (m.quoted.id == this.susunkata[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.susunkata[id][3]) 
             delete this.susunkata[id] 
             return this.reply(m.chat, '🏳️ Menyerah', m) 
         } 
         let json = JSON.parse(JSON.stringify(this.susunkata[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) { 
             const user = await db.users.get(m.sender)
             await db.users.update(m.sender, (user) => {
             user.exp += this.susunkata[id][2] 
             })
             this.reply(m.chat, `Jawaban Benar!\n+${this.susunkata[id][2]} XP`, m) 
             clearTimeout(this.susunkata[id][3]) 
             delete this.susunkata[id] 
         } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             this.reply(m.chat, '❌ Salah!', m) 
     } 
     return !0 
} 
export const exp = 0 
  
const buttonsusunkata = [ 
     ['susunkata', '/susunkata'] 
 ]