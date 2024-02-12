import db from '../lib/database/index.js'

let jarspy = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = await db.chats.get(m.chat)
  let user = await db.users.get(m.sender)
  let bot = await db.settings.get(conn.user.jid) || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      await db.chats.update(m.chat, chat => {
        chat.welcome = isEnable
      })
      break
    case 'detect':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      await db.chats.update(m.chat, chat => {
        chat.detect = isEnable
      })
      break
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      await db.chats.update(m.chat, chat => {
        chat.delete = isEnable
      })
      break
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      await db.chats.update(m.chat, chat => {
        chat.delete = !isEnable
      })
      break
    case 'document':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      await db.chats.update(m.chat, chat => {
        chat.useDocument = isEnable
      })
      break
    case 'public':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      await db.chats.update(m.chat, chat => {
        chat.antiLink = isEnable
      })
      break
    case 'autolevelup':
      isUser = true
      await db.users.update(m.sender, user => {
        user.autolevelup = isEnable
      })
      break
    case 'restrict':
      isAll = true
      if (!(isAdmin || isOwner)) {
        global.dfail('owner', m, conn)
        throw false
      }
      await db.settings.update(conn.user.jid, bot => {
        bot.restrict = isEnable
      })
      break
    case 'nyimak':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['nyimak'] = isEnable
      break
    case 'autoread':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
    case 'pconly':
    case 'privateonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break
    case 'gconly':
    case 'grouponly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
    case 'swonly':
    case 'statusonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['swonly'] = isEnable
      break
    case 'getmsg':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      await db.chats.update(m.chat, chat => {
        chat.getmsg = isEnable
      })
      break
    default:
      if (!/[01]/.test(command)) return m.reply(`
List option: welcome | detect | delete | antidelete | public | antilink | autolevelup | document | whitelistmycontacts | restrict | nyimak | autoread | pconly | gconly | swonly | getmsg

Contoh:
${usedPrefix}enable welcome
${usedPrefix}disable welcome
`.trim())
      throw false
  }
  m.reply(`
*${type}* berhasil di *${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
`.trim())
}
jarspy.help = ['enable', 'disable']
jarspy.tags = ['group']
jarspy.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default jarspy