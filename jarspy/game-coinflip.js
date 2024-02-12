import { Sticker } from 'wa-sticker-formatter'; 
import db from '../lib/database/index.js'
  
const jarspy = async (m, { conn, command, usedPrefix, args, text }) => { 
   const user = await db.users.get(m.sender)
   
   const arr = ["atas", "bawah"]; 
   if (!arr.includes(args[0])) throw `Contoh pemakaian: ${usedPrefix + command} bawah`; 
   const terbang = arr.getRandom(); 
   const res = terbang === "atas" 
     ? "https://cdn-icons-png.flaticon.com/512/1490/1490832.png" 
     : "https://cdn-icons-png.flaticon.com/512/4315/4315581.png"; 
  
   const MiliSecond = 3000; //1 second 
  
   const coins = parseInt(Math.floor(Math.random() * 10000)); 
   const exp = parseInt(Math.floor(Math.random() * 1000)); 
  
   const createSticker = async (img, url, packName, authorName, quality) => { 
     const stickerMetadata = { 
       type: 'full', 
       pack: `Request By ${conn.getName(m.sender)}`, 
       author: global.author, 
       quality 
     }; 
     return (new Sticker(img ? img : url, stickerMetadata)).toBuffer(); 
   }; 
  
   try { 
     const stiker = await createSticker(false, res, terbang === "atas" ? "WINNER" : "LOSE", "COINFLIP", 30); 
     const pesan = ` 
 *[ ${terbang === "atas" ? "WIN" : "LOSE"} ]* 
  
 ${terbang === "atas" ? "Anda Mendapatkan:" : "Inventory Berkurang:"} 
 ${new Intl.NumberFormat('en-US').format(coins)} Money 
 ${new Intl.NumberFormat('en-US').format(exp)} XP 
 `; 
  
     m.reply(stiker).then(() => { 
       setTimeout(() => { 
         conn.reply(m.chat, pesan, m); 
       }, MiliSecond); 
     }); 
  
     if (terbang === "atas") { 
     db.users.update(m.sender, (user) => {
       user.money += coins; 
       user.exp += exp; 
       })
     } else if (terbang === "bawah") { 
     db.users.update(m.sender, (user) => {
       user.money -= coins; 
       user.exp -= exp; 
       })
     } 
   } catch (error) { 
     console.log(error); 
     m.reply('Terjadi kesalahan saat melakukan operasi'); 
   } 
 }; 
  
jarspy.help = ["coinflip"];
jarspy.tags = ["game"]; 
jarspy.command = /^((coin|koin)?flip)$/i; 
export default jarspy;