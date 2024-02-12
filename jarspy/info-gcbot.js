import fs from 'fs'
import fetch from 'node-fetch'

let jarspy = async(m, { conn }) => { 

         let caption = `*Link Komunitas ${global.namabot}*`
  conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: `2024 © ${global.wmtitle}`,
          thumbnailUrl: 'https://telegra.ph/file/cfb6291a5b51b11a4607d.jpg',
          sourceUrl: sgc,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
}
jarspy.help = ['gcbot']
jarspy.tags = ['info']
jarspy.command = /^(komunitas|grupbot|gcbot)$/i

export default jarspy