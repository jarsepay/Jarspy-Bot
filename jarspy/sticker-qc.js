/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let jarspy = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `Contoh pemakaian: ${usedPrefix}${command} Done`
   if (!text) return m.reply('enter text')
   if (text.length > 10000) return m.reply('Maksimal 50 kata!')
   try {
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/3Fh9V6p/avatar-contact.png')

   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#000000",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.name,
            "photo": {
               "url": pp
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://quote.btch.bz/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
   let stiker = await sticker(buffer, false, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
    } catch (error) {
    console.log(error)
    m.reply("Sepertinya ada yang salah, coba lagi nanti")
  }
}

jarspy.help = ['qc']
jarspy.tags = ['sticker']
jarspy.command = /^(qc|quotely)$/i
jarspy.premium = false
jarspy.limit = 3

export default jarspy

function from(data, encoding) {
    return new Buffer(data, encoding);
}