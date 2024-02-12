import Connection from '../lib/connection.js'

let jarspy = async (m, { conn }) => {
    let txt = ''
    for (let [jid, chat] of Object.entries(Connection.store.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) txt += `${await conn.getName(jid)}\n🪪${jid} [${chat?.metadata?.read_only ? 'Left' : 'Joined'}]\n\n`
    m.reply(`Daftar Grup:
${txt}
`.trim())
}
jarspy.help = ['grouplist']
jarspy.tags = ['info']
jarspy.command = /^(group(s|list)|listgroup)$/i

export default jarspy