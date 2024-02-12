import { toPTT } from '../lib/converter.js'

let jarspy = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Balas video/audio yang ingin Anda ubah menjadi catatan suara/vn dengan teks ${usedPrefix + command}`
    let media = await q.download?.()
    if (!media) throw 'Tidak dapat mengunduh media'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Tidak dapat mengonversi media ke audio'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
jarspy.help = ['tovn']
jarspy.tags = ['audio']
jarspy.command = /^to(vn|(ptt)?)$/i

export default jarspy