let jarspy = async (m, { conn, usedPrefix, command, args: [event], text }) => { 
     if (!event) return await conn.reply(m.chat, `Contoh pemakaian: 
◦ ${usedPrefix + command} welcome @user 
◦ ${usedPrefix + command} bye @user`.trim(), m) 
     let mentions = text.replace(event, '').trimStart() 
     let who = mentions ? conn.parseMention(mentions) : [] 
     let part = who.length ? who : [m.sender] 
     let act = false 
     m.reply(`*Simulating ${event}...*`) 
     switch (event.toLowerCase()) { 
         case 'add': 
         case 'invite': 
         case 'welcome': 
             act = 'add' 
             break 
         case 'bye': 
         case 'kick': 
         case 'leave': 
         case 'remove': 
             act = 'remove' 
             break
         default: 
             throw eror 
     } 
     if (act) return conn.participantsUpdate({ 
         id: m.chat, 
         participants: part, 
         action: act 
     })
}
jarspy.help = ['simulate'] 
jarspy.tags = ['owner'] 
jarspy.command = /^simulate$/i
 
export default jarspy