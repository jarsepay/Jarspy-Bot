import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
let jarspy = async (m, { conn, text, participants }) => {
  let users = participants.map(u => conn.decodeJid(u.id))
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  const msg = conn.cMod(m.chat,
    generateWAMessageFromContent(m.chat, {
      [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
        text: c || ''
      }
    }, {
      quoted: m,
      userJid: conn.user.id
    }),
    text || q.text, conn.user.jid, { mentions: users }
  )
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}
jarspy.help = ['announce', 'hidetag']
jarspy.tags = ['group']
jarspy.command = /^(h|ht|announce|hiddentag|hidetag)$/i

jarspy.group = true
jarspy.admin = true

export default jarspy