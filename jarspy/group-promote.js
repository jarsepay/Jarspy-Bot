import { areJidsSameUser } from '@whiskeysockets/baileys' 
let jarspy = async (m, { conn, participants }) => { 
     let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id)) 
     let promoteUser = [] 
     for (let user of users) 
         if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) { 
             const res = await conn.groupParticipantsUpdate(m.chat, [user], 'promote') 
             await delay(1 * 1000) 
         } 
     m.reply('Selesai') 
  
} 
jarspy.help = ['promote'] 
jarspy.tags = ['group'] 
jarspy.command = /^(promote)$/i 
  
jarspy.admin = true 
jarspy.group = true 
jarspy.botAdmin = true 
  
export default jarspy 
  
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))