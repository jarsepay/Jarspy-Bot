let jarspy = async (m, { conn }) => { 
     conn.tebakchara = conn.tebakchara ? conn.tebakchara : {} 
     let id = m.chat 
     if (!(id in conn.tebakchara)) throw false 
     let json = conn.tebakchara[id][1] 
     conn.reply(m.chat, '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hcha$/i 
  
jarspy.limit = true 
  
export default jarspy