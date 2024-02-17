/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch'

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
  if (command == 'bing') {
    if (!text) throw `Contoh pemakaian: ${usedPrefix + command} siapa presiden Indonesia?`
    try {
    m.react('🕑')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: lann
          })
        })
        .then(res => res.json());
    await conn.sendMessage(m.chat, {
    text: response.message,
    contextInfo: {
    externalAdReply: { 
    title: 'Bing-AI',
    body: '',
    thumbnailUrl: "https://telegra.ph/file/b6a2e82f30570afa1d082.jpg",
    sourceUrl: "https://api.betabotz.eu.org",
    mediaType: 1,
    renderLargerThumbnail: true
    }}}, { quoted: m})
    } catch (e) {
      console.log(e)
      throw e.message
    }
  }
  if (command == 'bingimg') {
    if (!text) throw `Contoh pemakaian: ${usedPrefix + command} sebuah pulau terbang di langit dipenuhi dengan sebuah mega istana`
    try {
      m.react('🕑')
      let response = await fetch('https://api.betabotz.eu.org/api/search/bing-img', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            apikey: lann
          })
        })
        .then(res => res.json())

      for (let i = 0; i < 4; i++) {
        let img = response.result[i]
        await sleep(3000)
        await conn.sendFile(m.chat, img, 'bing_img.png', `*PROMPT:* ${text}`, m)
      }
    } catch (error) {
      throw error.message
    }
  }
}

jarspy.command = jarspy.help = ['bing', 'bingimg']
jarspy.tags = ['ai']

jarspy.limit = 10

export default jarspy

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}