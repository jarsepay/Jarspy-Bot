import similarity from 'similarity' 
import db from '../lib/database/index.js'

const threshold = 0.72 
export async function before(m) { 
     let id = m.chat 
     if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hsur/i.test(m.quoted.text) || /.*hsur/i.test(m.text)) 
         return !0 
     this.tebaksurah = this.tebaksurah ? this.tebaksurah : {} 
     if (!(id in this.tebaksurah)) 
         return this.reply(m.chat, 'Soal itu telah berakhir.', m) 
     if (m.quoted.id == this.tebaksurah[id][0].id) { 
         let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text) 
         if (isSurrender) { 
             clearTimeout(this.tebaksurah[id][3]) 
             delete this.tebaksurah[id] 
             return this.reply(m.chat, '🏳️ Menyerah', m) 
         } 
         let json = JSON.parse(JSON.stringify(this.tebaksurah[id][1])) 
         // m.reply(JSON.stringify(json, null, '\t')) 
         if (m.text.toLowerCase() == json.surah.englishName.toLowerCase().trim()) { 
             const user = await db.users.get(m.sender)
             await db.users.update(m.sender, (user) => {
             user.exp += this.tebaksurah[id][2] 
             })
             this.reply(m.chat, `Jawaban Benar!\n+${this.tebaksurah[id][2]} XP`, m) 
             clearTimeout(this.tebaksurah[id][3]) 
             delete this.tebaksurah[id] 
         } else if (similarity(m.text.toLowerCase(), json.surah.englishName.toLowerCase().trim()) >= threshold) 
             m.reply('Sedikit lagi!') 
         else 
             this.reply(m.chat, '❌ Salah!', m) 
     } 
     return !0 
} 
export const exp = 0 
  
const buttontebaksurah = [ 
     ['tebaksurah', '/tebaksurah'] 
 ]