let handler = async (m, { 
     conn, 
     args, 
     usedPrefix, 
     command 
 }) => { 
     let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender 
     let name = m.name 
     let text 
     if (args.length >= 1) { 
         text = args.slice(0).join(" ") 
     } else if (m.quoted && m.quoted.text) { 
         text = m.quoted.text 
     } else throw "*Masukkan teks!*" 
  
     try { 
         const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg') 
         const username = who.split("@")[0] 
         const url = `https://some-random-api.com/canvas/misc/youtube-comment?avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(text)}&username=${encodeURIComponent(name)}`
         conn.sendFile(m.chat, url, "youtube.png", "*Youtube*", m) 
     } catch (e) { 
         await m.reply(`Error: ${e}`) 
     } 
 } 
  
 handler.help = ["ytcomment"] 
 handler.tags = ["maker", "youtube"] 
 handler.command = ["ytcomment"] 
 handler.limit = true
  
 export default handler