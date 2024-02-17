import fetch from "node-fetch" 
let jarspy = async (m, { conn, usedPrefix, command }) => { 
  let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/Programming.json`) 
  let f = await g.json() 
  let a = f[Math.floor(Math.random() * f.length)] 
 conn.sendFile(m.chat, a, 'programming.jpg', "Program Wallpaper", m) 
} 
jarspy.help = ['programming'] 
jarspy.tags = ['internet'] 
jarspy.command = /^programming$/i 
  
export default jarspy