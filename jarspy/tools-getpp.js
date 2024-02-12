import fetch from 'node-fetch'
let jarspy = async(m, { conn }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let url = await conn.profilePictureUrl(who, 'image')
    await conn.sendFile(m.chat, url, 'profile.jpg', `@${who.split`@`[0]}`, m, null, { mentions: [who]})
}
jarspy.command = /^(getpp|getprofile)$/i
jarspy.help = ['getprofile']
jarspy.tags = ['tools']
export default jarspy