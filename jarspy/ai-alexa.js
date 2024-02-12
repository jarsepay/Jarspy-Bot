/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch'; 
  
let jarspy = async (m, { conn, text, usedPrefix, command }) => { 
  const name = conn.getName(m.sender); 
  if (!text) { 
    throw `Hai *${name}*, apakah kamu ingin bicara? tanggapi dengan *${usedPrefix + command}* (pesan dalam bahasa inggris)\n\nContoh: *${usedPrefix + command}* Hi`; 
  }  
  
  const uid = encodeURIComponent(m.sender); 
  const msg = encodeURIComponent(text); 
  
  const res = await fetch(`http://api.brainshop.ai/get?bid=176023&key=LDSYmkI28NH1qFuN&uid=${uid}&msg=${msg}`); 
  const json = await res.json(); 
  
  if (json.cnt) { 
    const reply = json.cnt; 
    m.reply(reply); 
  } else { 
    throw json; 
  } 
}; 
jarspy.help = ['alexa']; 
jarspy.tags = ['ai']; 
jarspy.command = ['alexa']; 

export default jarspy;