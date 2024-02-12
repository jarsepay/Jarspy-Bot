let jarspy = async (m, { conn, command, text }) => { 
   conn.reply(m.chat, ` 
 *Pertanyaan:* ${command} ${text}
 *Jawaban:* ${pickRandom(['di neraka','di surga','di mars','di tengah laut','di dada :v','di hatimu >///<'])} 
 `.trim(), m, m.mentionedJid ? { 
     contextInfo: { 
       mentionedJid: m.mentionedJid 
     } 
   } : {}) 
 } 
jarspy.help = ['', 'kah'].map(v => 'dimana' + v + '')
jarspy.tags = ['fun']
// jarspy.customPrefix = /(\?$)/
jarspy.command = /^dimana(kah)?$/i
  
 export default jarspy 
  
 function pickRandom(list) { 
   return list[Math.floor(Math.random() * list.length)] 
 }