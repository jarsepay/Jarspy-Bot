import fetch from 'node-fetch'
  
let jarspy = async (m, { conn, text }) => { 
  let res = await fetch('https://raw.githubusercontent.com/HasamiAini/wabot_takagisan/main/whatsapp%20bot%20takagisan/whatsapp%20bot%20takagisan/lib/memeindo.json') 
  let json = await res.json(); 
  let url = json[Math.floor(Math.random() * json.length)]  
  await conn.sendFile(m.chat, await (await fetch(url.image)).buffer(), m)
}
jarspy.help = ['meme']
jarspy.tags = ['internet']
jarspy.command = /^(meme)$/i

export default jarspy