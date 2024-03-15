/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch'
let jarspy = async (m, { conn, args, usedPrefix, command }) => {
   if (!args[0]) throw `Contoh pemakaian:\n${usedPrefix + command} https://v.douyin.com/iXpBGvx/`
   if (!args[0].match(/douyin/gi)) throw `URL tidak valid`
   await m.react("🕐")
   
  try {
   let dou = await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=${global.lolkey}&url=${args[0]}`)
   if (!dou.ok) throw await dou.text()
   let douydl = await dou.json()
   if (!douydl.status) throw tiodl
   let { title, link, author, statistic } = douydl.result
   
   await conn.sendFooterVideo(m.chat, link, '*Douyin Downloader*', `┌─❖\n│「 *D O U Y I N  D L* 」\n└┬❖ 「  I N F O ⁩ 」\n   │✑ *Username :* ${author.username}\n   │✑ *Nickname :* ${author.nickname}\n   │\n   │✑ *Play :* ${statistic.play_count}\n   │✑ *Like :* ${statistic.like_count}\n   │✑ *Share :* ${statistic.share_count}\n   │✑ *Comment :* ${statistic.comment_count}\n   └───────────────┈ ⳹`, wmtitle, m)
   } catch (e) {
     console.log(e)
     m.reply(`Error: ${e.message}`)
   }
}
jarspy.help = ['douyin']
jarspy.tags = ['downloader']
jarspy.command = /^(douyin|douyindl)$/i

jarspy.limit = 8

export default jarspy