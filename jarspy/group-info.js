import db from '../lib/database/index.js'

let jarspy = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { banned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = await db.chats.get(m.chat)
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const listMember = participants.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `*「 Informasi Grup 」*
◦ *ID:* 
${groupMetadata.id}
◦ *Nama:* 
${groupMetadata.subject}
◦ *Deskripsi:* 
${groupMetadata.desc?.toString() || 'unknown'}
◦ *Total Peserta:*
${participants.length} Members
◦ *Pemilik Grup:* 
@${owner.split('@')[0]}
◦ *Admin Grup:*
${listAdmin}
◦ *Peserta Grup:*
${listMember}
▢ *Pengaturan Grup:*
◦ ${banned ? '✅' : '❌'} Banned
◦ ${welcome ? '✅' : '❌'} Welcome
◦ ${detect ? '✅' : '❌'} Detect
◦ ${del ? '❌' : '✅'} Anti Delete
◦ ${antiLink ? '✅' : '❌'} Anti Link
▢ *Pengaturan Pesan:*
◦ Welcome: ${sWelcome}
◦ Bye: ${sBye}
◦ Promote: ${sPromote}
◦ Demote: ${sDemote}
`.trim()
conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner, ...participants.map(v => v.id)] })

}

jarspy.help = ['infogrup']
jarspy.tags = ['group']
jarspy.command = /^(gro?upinfo|info(gro?up|gc))$/i

jarspy.group = true

export default jarspy