let jarspy = async (m, { conn }) => { 
     conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {} 
     let id = m.chat 
     if (!(id in conn.tebaklagu)) throw false 
     let json = conn.tebaklagu[id][1] 
     conn.reply(m.chat, '```' + json.judul.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hlag$/i 
  
jarspy.limit = true 
  
export default jarspy