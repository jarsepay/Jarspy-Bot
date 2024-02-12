let jarspy = async (m, { conn }) => { 
     conn.tekateki = conn.tekateki ? conn.tekateki : {} 
     let id = m.chat 
     if (!(id in conn.tekateki)) throw false 
     let json = conn.tekateki[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', ) 
} 
jarspy.command = /^htek$/i 
  
jarspy.limit = true 
  
export default jarspy