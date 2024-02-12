let jarspy = async (m, { conn }) => { 
     conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {} 
     let id = m.chat 
     if (!(id in conn.tebakingambar)) throw false 
     let json = conn.tebakingambar[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hgam$/i 
  
jarspy.limit = true 
  
export default jarspy