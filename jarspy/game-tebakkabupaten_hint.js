let jarspy = async (m, { conn }) => { 
     conn.tebakkabupaten = conn.tebakkabupaten ? conn.tebakkabupaten : {} 
     let id = m.chat 
     if (!(id in conn.tebakkabupaten)) throw false 
     let json = conn.tebakkabupaten[id][1] 
     conn.reply(m.chat, '```' + json.title.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hkab$/i 
  
jarspy.limit = true 
  
export default jarspy