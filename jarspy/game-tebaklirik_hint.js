let jarspy = async (m, { conn }) => { 
     conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {} 
     let id = m.chat 
     if (!(id in conn.tebaklirik)) throw false 
     let json = conn.tebaklirik[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hlir$/i 
  
jarspy.limit = true 
  
export default jarspy