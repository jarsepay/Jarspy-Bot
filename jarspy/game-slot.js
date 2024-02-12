/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args, usedPrefix, command }) => { 
     let fa = ` 
Cara penggunaan: 
${usedPrefix + command} angka 
Contoh pemakaian: 
${usedPrefix + command} 100 
  
Artinya kamu bertaruh 100 XP.  
*JACKPOT:* taruhan digandakan 
*Kalah:* taruhan diambil`.trim() 
     if (!args[0]) throw fa 
     if (isNaN(args[0])) throw fa 
     let taruhan = parseInt(args[0]) 
     let user = await db.users.get(m.sender)
     let time = user.lastslot + 10000 
     if (new Date - user.lastslot < 10000) throw `Tunggu selama ${msToTime(time - new Date())}` 
     if (taruhan < 1) throw 'Minimal 1 XP!' 
     if (user.exp < taruhan) { 
         throw `XP kamu tidak cukup!` 
     } 
  
     let bet = ["🏆️", "🥇", "💵"]; 
     let a = Math.floor(Math.random() * bet.length) 
     let b = Math.floor(Math.random() * bet.length) 
     let c = Math.floor(Math.random() * bet.length) 
     let x = [], 
         y = [], 
         z = [] 
     for (let i = 0; i < 3; i++) { 
         x[i] = bet[a] 
         a++ 
         if (a == bet.length) a = 0 
     } 
     for (let i = 0; i < 3; i++) { 
         y[i] = bet[b] 
         b++ 
         if (b == bet.length) b = 0 
     } 
     for (let i = 0; i < 3; i++) { 
         z[i] = bet[c] 
         c++ 
         if (c == bet.length) c = 0 
     } 
     let end 
     if (a == b && b == c) { 
         end = `JACKPOT! 🥳 *+${taruhan + taruhan} XP*` 
         await db.users.update(m.sender, (user) => {
             user.exp += taruhan
             })
     } else if (a == b || a == c || b == c) { 
         end = `LOSE 😥 *-${taruhan} XP*`
         await db.users.update(m.sender, (user) => {
             user.exp -= taruhan
             })
     } 
     user.lastslot = new Date * 1 
     return await conn.reply(m.chat, ` 
 *[ 🎰 | SLOTS ]* 
  
 ${end} 
  
 ${x[0]} ${y[0]} ${z[0]} 
 ${x[1]} ${y[1]} ${z[1]} 
 ${x[2]} ${y[2]} ${z[2]}`.trim(), m) 
} 
jarspy.help = ['slot'] 
jarspy.tags = ['game'] 
jarspy.command = /^(slot?)$/i 
export default jarspy 
  
function msToTime(duration) { 
     var seconds = Math.floor((duration / 1000) % 60), 
         minutes = Math.floor((duration / (1000 * 60)) % 60), 
         hours = Math.floor((duration / (1000 * 60 * 60)) % 24) 
     hours = (hours < 10) ? "0" + hours : hours 
     minutes = (minutes < 10) ? "0" + minutes : minutes 
     seconds = (seconds < 10) ? "0" + seconds : seconds 
     return minutes + " menit " + seconds + " detik" 
 }