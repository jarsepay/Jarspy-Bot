import db from '../lib/database/index.js'
import Connection from '../lib/connection.js'

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let jarspy = async (m, { conn, command, usedPrefix, text, isOwner }) => {
  let [_, code, expired] = text.match(linkRegex) || []
  if (!code) throw `Contoh pemakaian: ${usedPrefix}${command} ${sgc}`
  let res = await conn.groupAcceptInvite(code)
  expired = Math.floor(Math.min(999, Math.max(1, isOwner ? isNumber(expired) ? parseInt(expired) : 0 : 1)))
  m.reply(`Berhasil join ke dalam grup selama ${expired} hari`)
  setTimeout(() => {
    conn.sendMessage(nomorowner + `@s.whatsapp.net`, {
     text: `*• NOTIFICATION •*\n\nUser ${conn.getName(m.sender)} baru saja menggunakan fitur ini.`,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wmtitle,
     body: wmbody,
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: thumbs,
     renderLargerThumbnail: true
     }}}, { quoted: m })
     }, 5000)
     
  let chats = db.users.get(res)
  if (!chats) {
    chats = {
      expired: 0
    }
    db.users.update(res, chats)
  }
  if (expired) {
    db.users.update(res, (chats) => {
      chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
    })
  }
}
jarspy.help = ['join']
jarspy.tags = ['main']
jarspy.command = /^join$/i

jarspy.premium = true

export default jarspy

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))