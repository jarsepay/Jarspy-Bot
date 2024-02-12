let jarspy = async (m, { conn }) => { 
     conn.tebakpemain = conn.tebakpemain ? conn.tebakpemain : {} 
     let id = m.chat 
     if (!(id in conn.tebakpemain)) throw false 
     let json = conn.tebakpemain[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hbol$/i 
  
jarspy.limit = true 
  
export default jarspy