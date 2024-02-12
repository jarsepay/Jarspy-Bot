import { googleImage, pinterest } from '@bochilteam/scraper' 
  
let jarspy = async (m, { conn, text, usedPrefix, command }) => {
    
     if (!text) throw `Contoh pemakaian: ${usedPrefix}${command} Ai Hoshino` 
     const res = await (await googleImage('pixiv' + text)).getRandom() 
     conn.sendFile(m.chat, res, m) 
} 
jarspy.help = ['pixiv'] 
jarspy.tags = ['internet'] 
jarspy.command = ['pixiv'] 
  
export default jarspy