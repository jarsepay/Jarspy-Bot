import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let jarspy = async (m, { args, conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw `Kirim/Reply Gambar Dengan Caption ${usedPrefix}${command}`
m.react('🕑')
let media = await q.download()
let url = await uploadImage(media)
let hasil = await (await fetch(`https://api.lolhuman.xyz/api/imagetoanime?apikey=${global.lolkey}&img=${url}`)).buffer()
await conn.sendFile(m.chat, hasil, '', 'Jadianime', m)
}
jarspy.help = ['jadianime']
jarspy.tags = ['ai']
jarspy.command = /^(jadianime|toanime)$/i
jarspy.limit = 10

export default jarspy