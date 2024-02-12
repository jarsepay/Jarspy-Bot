let jarspy = async (m, { conn }) => { 
     conn.susunkata = conn.susunkata ? conn.susunkata : {} 
     let id = m.chat 
     if (!(id in conn.susunkata)) throw false 
     let json = conn.susunkata[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hsus$/i 
  
jarspy.limit = true 
  
export default jarspy