let jarspy = async (m, { 
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
     } else throw "Berikan komentar"
  
     try { 
         const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg') 
         let part1 = Math.floor(Math.random() * 1000); 
         let part2 = Math.floor(Math.random() * 1000); 
         const username = who.split("@")[0] 
         const replies = part1 
         const retweets = part1 
         const theme = "dim" 
         const url = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(text)}&replies=${encodeURIComponent(replies)}&retweets=${encodeURIComponent(retweets)}&theme=${encodeURIComponent(theme)}` 
         conn.sendFile(m.chat, url, "tweet.png", "Twitter", m) 
     } catch (e) { 
         await m.reply(`Error: ${e}`) 
     } 
} 
  
jarspy.help = ["tweetc"] 
jarspy.tags = ["maker"] 
jarspy.command = ["tweetc"] 
jarspy.limit = 5

export default jarspy