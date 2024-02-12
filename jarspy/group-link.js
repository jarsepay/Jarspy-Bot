import { areJidsSameUser } from '@whiskeysockets/baileys'
let jarspy = async (m, { conn, args }) => {
    let group = m.chat
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw 'Hanya bisa dibuka di grup!'
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'groupMetadata is undefined :\\'
    if (!('participants' in groupMetadata)) throw 'Peserta grup tidak diketahui!'
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw 'Bot tidak ada digrup itu'
    if (!me.admin) throw `${namabot} bukan admin`
    m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
jarspy.help = ['linkgrup']
jarspy.tags = ['group']
jarspy.command = /^link(gro?up)?|(gro?up)?link$/i


export default jarspy