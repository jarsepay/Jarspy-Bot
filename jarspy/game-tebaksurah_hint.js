let jarspy = async (m, { conn }) => { 
     conn.tebaksurah = conn.tebaksurah ? conn.tebaksurah : {} 
     let id = m.chat 
     if (!(id in conn.tebaksurah)) throw false 
     let json = conn.tebaksurah[id][1] 
     conn.reply(m.chat, '```' + json.surah.englishName.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hsur$/i 
  
jarspy.limit = true 
  
export default jarspy