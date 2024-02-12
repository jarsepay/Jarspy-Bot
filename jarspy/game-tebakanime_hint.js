let jarspy = async (m, { conn }) => { 
     conn.tebakanjime = conn.tebakanjime ? conn.tebakanjime : {} 
     let id = m.chat 
     if (!(id in conn.tebakanjime)) throw false 
     let json = conn.tebakanjime[id][1] 
     conn.reply(m.chat, '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hani$/i 
  
jarspy.limit = true 
  
export default jarspy