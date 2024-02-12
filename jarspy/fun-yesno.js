import fetch from 'node-fetch'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let jarspy = async (m, { command, usedPrefix, conn, args  }) => { 
    await m.react("🕐") 
    let res = await YesNo() 
    let stiker = await createSticker(false, res.image, `${global.namabot} Mengatakan `, (res.answer).toUpperCase(), 30) 
          
    try { 
        await m.reply(stiker) 
    } catch (e) { 
        throw "Error: " + e.message
   } 
} 
jarspy.help = ["yesno"] 
jarspy.tags = ["fun"]   
jarspy.command = /^(yesno)$/i 
  
export default jarspy
  
async function YesNo() { 
    const response = await fetch( 
        `https://yesno.wtf/api` 
     ); 
    const data = await response.json(); 
    return data; 
}   
async function createSticker(img, url, packName, authorName, quality) { 
    let stickerMetadata = { 
        type: 'full', 
        pack: packName, 
        author: authorName, 
        quality 
    } 
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer() 
}