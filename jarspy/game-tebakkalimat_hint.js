let jarspy = async (m, { conn }) => { 
     conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {} 
     let id = m.chat 
     if (!(id in conn.tebakkalimat)) throw false 
     let json = conn.tebakkalimat[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hkal$/i 
  
jarspy.limit = true 
  
export default jarspy