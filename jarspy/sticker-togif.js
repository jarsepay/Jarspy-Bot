import { webp2mp4 } from '../lib/webp2mp4.js' 
  
let jarspy = async (m, { conn, usedPrefix, command }) => { 
if (!m.quoted) throw `balas stiker dengan caption *${usedPrefix + command}*` 
    let q = m.quoted ? m.quoted : m 
    let mime = (q.msg || q).mimetype || '' 
     if (!/webp/g.test(mime)) throw `balas stiker dengan caption *${usedPrefix + command}*` 
     let media = await q.download?.() 
     let out = Buffer.alloc(0) 
     if (/webp/g.test(mime)) { 
         out = await webp2mp4(media) 
     } 
     await conn.sendMessage(m.chat, { 
                 video: { url: out }, 
                 caption: 'Sticker to gif', 
                 gifPlayback: true, 
                 gifAttribution: 1
             }, { 
                 quoted: m 
             }) 
 } 
jarspy.help = ['togif'] 
jarspy.tags = ['sticker'] 
jarspy.command = /^togif?$/i 
  
export default jarspy