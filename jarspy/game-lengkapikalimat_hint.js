let jarspy = async (m, { conn }) => { 
     conn.lengkapikalimat = conn.lengkapikalimat ? conn.lengkapikalimat : {} 
     let id = m.chat 
     if (!(id in conn.lengkapikalimat)) throw false 
     let json = conn.lengkapikalimat[id][1] 
     conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m) 
} 
jarspy.command = /^hlen$/i 
  
jarspy.limit = true 
  
export default jarspy