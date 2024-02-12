let jarspy = async (m, { conn, text, participants}) => { 
  
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid) 
    if (!m.quoted) throw `Reply Pesan!` 
    conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users } ) 
} 
  
jarspy.help = ['totag'] 
jarspy.tags = ['group'] 
jarspy.command = /^(totag|tag)$/i 
  
jarspy.admin = true 
jarspy.group = true 
  
export default jarspy