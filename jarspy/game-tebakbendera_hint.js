let jarspy = async (m, { conn }) => { 
     conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {} 
     let id = m.chat 
     if (!(id in conn.tebakbendera)) throw false 
     let json = conn.tebakbendera[id][1] 
     conn.reply(m.chat, '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hben$/i 
  
jarspy.limit = true 
  
export default jarspy