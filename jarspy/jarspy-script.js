/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import moment from 'moment-timezone' 
import fetch from 'node-fetch' 
  
let jarspy = async (m, { conn, args }) => { 
    let res = await fetch('https://api.github.com/repos/jarsepay/Jarspy-Bot')
    let json = await res.json()
    let txt = `*乂 S C R I P T  -  B O T*\n\n` 
       txt += `◦  *Nama* : ${json.name}\n` 
       txt += `◦  *Visitor* : ${json.watchers_count}\n` 
       txt += `◦  *Ukuran* : ${(json.size / 1024).toFixed(2)} MB\n` 
       txt += `◦  *Update* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n` 
       txt += `◦  *Url* : ${json.html_url}\n\n` 
       txt += `*${json.forks_count}* Forks · *${json.stargazers_count}* Stars · *${json.open_issues_count}* Issues\n\n`
       txt += `Recoder: *Jarsépay*\n`
       txt += `Contact to Recoder: *wa.me/6282148864989*\n`
       txt += `Find me on Discord: *jarspy* (username)`
    await conn.reply(m.chat, txt, m)
 } 
jarspy.help = ['script']
jarspy.tags = ['info']
jarspy.command = /^(scbot|scriptbot|sourcecode|script|sc)$/i

export default jarspy