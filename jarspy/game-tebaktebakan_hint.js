let jarspy = async (m, { conn }) => { 
     conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {} 
     let id = m.chat 
     if (!(id in conn.tebaktebakan)) throw false 
     let json = conn.tebaktebakan[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hteb$/i 
  
jarspy.limit = true 
  
export default jarspy