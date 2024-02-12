let jarspy = async (m, { conn, text }) => { 
  let tag = `@${m.sender.replace(/@.+/, '')}` 
  let mentionedJid = [m.sender] 
  conn.reply(m.chat, tag, m, { contextInfo: { mentionedJid }}) 
} 
jarspy.help = ['tagme'] 
jarspy.tags = ['group'] 
jarspy.command = /^tagme$/i 
  
jarspy.group = true 
  
export default jarspy