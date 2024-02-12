import { toAudio } from '../lib/converter.js'

let jarspy = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Balas video/catatan suara yang ingin Anda ubah menjadi audio/mp3 dengan teks ${usedPrefix + command}`
    let media = await q.download?.()
    if (!media) throw 'Tidak dapat mengunduh media'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Tidak dapat mengonversi media ke audio'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
}
jarspy.help = ['tomp3']
jarspy.tags = ['audio']
jarspy.command = /^to(mp3|a(udio)?)$/i

export default jarspy