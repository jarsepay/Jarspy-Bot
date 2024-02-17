/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import axios from 'axios'
import cheerio from 'cheerio'
import canvafy from 'canvafy'
  
let jarspy = async (m, { conn, text, usedPrefix, command }) => { 
  if (!text) throw `Contoh pemakaian:\n${usedPrefix + command} Petrus`
  await m.react("🕐")
  try {
  let result = await Alkitab(text)
  let caption = result.map(v => `${v.title}\n${v.teks}`).join('\n────────\n')
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
  const p = await new canvafy.WelcomeLeave()
  .setAvatar(pp)
  .setBackground("image", "https://telegra.ph/file/07ab9a91fa8f9a25d1d03.jpg")
  .setTitle(`${conn.getName(m.sender)}`)
  .setDescription(`Semangat membaca bang, salam toleransi\n~${namaowner}`)
  .setBorder("#2a2e35")
  .setAvatarBorder("#2a2e35")
  .setOverlayOpacity(0.3)
  .build()
  conn.sendFile(m.chat, p, '', caption, m)
  } catch (e) {
  conn.reply(m.chat, e.message, m)
  console.log (e)
 }
}
jarspy.help = ['alkitab']
jarspy.tags = ['internet']
jarspy.command = /^(alkitab)$/i
  
export default jarspy
  
async function Alkitab(text) { 
  let res = await axios.get(`https://alkitab.me/search?q=${encodeURIComponent(text)}`, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36" } })
  
  let $ = cheerio.load(res.data)
  let result = []
   $('div.vw').each(function (a, b) { 
    let teks = $(b).find('p').text().trim()
    let link = $(b).find('a').attr('href') 
    let title = $(b).find('a').text().trim()
    result.push({ teks, link, title })
  })
  return result
}