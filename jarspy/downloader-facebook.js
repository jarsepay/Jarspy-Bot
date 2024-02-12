import fg from 'api-dylux'  
let jarspy = async (m, { conn, args, usedPrefix, command }) => { 
  
  if (!args[0]) throw `Contoh pemakaian: ${usedPrefix + command} https://fb.watch/d7nB8-L-gR/` 
     m.react('🕑')
    try { 
     let result = await fg.fbdl(args[0]); 
     let tex = ` 
 ┌─⊷ *Dylux FBDL* 
 ▢ *Judul:* ${result.title} 
 └───────────`; 
     conn.sendFile(m.chat, result.videoUrl, 'fb.mp4', tex, m);
   } catch (error) { 
          m.reply(`Error: ${error}`) 
          }  
} 
jarspy.help = ['facebook']
jarspy.tags = ['downloader'] 
jarspy.command = /^((facebook|fb)(downloder|dl)?)$/i 
jarspy.limit = 10
  
export default jarspy