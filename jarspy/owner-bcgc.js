import Connection from '../lib/connection.js'
import { randomBytes } from 'crypto'

let jarspy = async (m, { conn, text }) => {
  let groups = Object.entries(Connection.store.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
  for (let id of groups) {
    setTimeout(async () => {
      await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : teks + '\n\n' + '「 ' + namabot + ' Broadcast 🔊 」\n'), true).catch(_ => _)
    }, 15000)
  }
  m.reply('Selesai Broadcast All Group')
}
jarspy.help = ['broadcastgroup', 'bcgc']
jarspy.tags = ['owner']
jarspy.command = /^(broadcast|bc)(group|grup|gc)$/i

jarspy.owner = true

export default jarspy

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)