import fetch from 'node-fetch'
import api from 'api-dylux'
let jarspy = async (m, { conn, args, text, usedPrefix, command }) => { 
 if (!args[0]) throw `Contoh pemakaian: ${usedPrefix+command} https://vt.tiktok.com/ZSFejUP4F/`

let f = await api.tiktok(text)
await conn.sendMessage(m.chat, { react: { text: "🕑",key: m.key,}
  })  
 let cap = `*DOWNLOADER TIKTOK*
 
*Nickname :* ${f.nickname}
*Duration :* ${f.duration}
*Description :* ${f.description}`
conn.sendFile(m.chat, f.play, 'ttmp4', cap, m)
}
jarspy.help = ['tiktok']
jarspy.tags = ['downloader']
jarspy.command = /^(ttdl|tiktok|tiktokdl|tiktokdownload|tt|tiktokvid|ttvid|ttnowm|tiktoknowm)$/i
jarspy.limit = true
export default jarspy