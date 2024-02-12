import { areJidsSameUser } from '@whiskeysockets/baileys' 
let jarspy = async (m, { conn, participants }) => { 
     let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id)) 
      let user = m.mentionedJid && m.mentionedJid[0] 
             await conn.groupParticipantsUpdate(m.chat, [user], 'demote') 
  
     m.reply('Selesai') 
  
} 
jarspy.help = ['demote'] 
jarspy.tags = ['group'] 
jarspy.command = /^(demote)$/i 
  
jarspy.admin = true 
jarspy.group = true 
jarspy.botAdmin = true 
  
export default jarspy