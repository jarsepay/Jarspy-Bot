/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import { promises } from 'fs'
import fs from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import { jarspy } from '../lib/jarspy.js'
import { getUserCache } from './_cache.js';
let tags = {
  "ai": "AI",
  "anonymous": "Anonymous",
  "audio": "Audio",
  "anime": "Anime",
  "downloader": "Downloader",
  "fun": "Fun",
  "game": "Game",
  "group": "Group",
  "info": "Info",
  "internet": "Internet",
  "jadibot": "Jadi Bot",
  "main": "Main",
  "maker": "Maker",
  "owner": "Owner",
  "roleplay": "Role Playing",
  "rpg": "Role-Playing Game",
  "sticker": "Sticker",
  "tools": "Tools",
  "youtube": "Youtube",
  "": "No Category",
}
const defaultMenu = {
  before: `
<───「 %me 」───>
◦ Hai, %name!

◦ Limit : *%limit Limit*
◦ Role : *%role*
◦ Level : *%level (%exp / %maxexp)*
◦ Total XP : %totalexp
 
<───────────────>
◦ Tanggal: *%week, %date*
◦ Waktu: *%time*

◦ Uptime: *%uptime*
◦ User: %totalreg

%readmore`.trimStart(),
  header: '╭─「 %category 」',
  body: '│ • %cmd %islimit %isPremium',
  footer: '╰────\n',
  after: `
*%npmname* | %version
${'```%npmdesc```'}
`,
}
let jarsepay = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let user = await db.users.get(m.sender)
    let { exp = "-", limit = "-", level = "-", role = "-" } = user || {};
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString('id-ID', { weekday: 'long', timeZone: 'Asia/Jakarta' })
    let date = d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    
    
    //waktu
    let options = {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: 'Asia/Jakarta'
    };
    let time = d.toLocaleTimeString('id-ID', options).replace(/\./g, ':');
    let jam = parseInt(time.slice(0, 2));
    if (jam < 12) {
      time = time.concat(' AM');
    } else {
      time = time.concat(' PM');
    }
    time = time.concat(' (+', d.getSeconds(), ' Detik)');
    //waktu  
      
      
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)

    let totalreg = getUserCache().length;

    let help = Object.values(jarspy).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
    conn.sendMessage(m.chat, {
            document: fs.readFileSync("./media/jarspy.pdf"),
            fileName: wmtitle,
            mimetype: "application/pdf",
            fileLength: fsizedoc,
            pageCount: "2024",
            caption: text,
            mention: [m.sender],
            contextInfo: {
              forwardingScore: '9999999',
              externalAdReply: {
                mediaType: 1,
                mediaUrl: thumbs,
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: sgc,
                thumbnailUrl: thumbs,
                title: wmtitle, 
                body: wmbody,
              },
            },
          }, { quoted: m })
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
jarsepay.help = ['menu', 'help', '?']
jarsepay.tags = ['main']
jarsepay.command = /^(menu|help|\?)$/i

export default jarsepay

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}