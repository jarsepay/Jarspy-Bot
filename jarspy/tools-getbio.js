import moment from 'moment-timezone'

let jarspy = async (m, { conn, text, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    else who = m.sender
    try {
    let bio = await conn.fetchStatus(who)
    let setAt = moment.utc(bio.setAt, 'YYYY-MM-DD\THH:mm:ss\Z').format('YYYY-MM-DD')
    conn.reply(m.chat, '◦ *Status:* ' + bio.status + '\n◦ *Diset pada:* ' + setAt, m)
    } catch {
    throw 'Terjadi kesalahan'
    }
}
jarspy.help = ['getbio']
jarspy.tags = ['tools']
jarspy.command = /^(getb?io)$/i
export default jarspy