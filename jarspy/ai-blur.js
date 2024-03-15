/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import jimp from 'jimp'

let jarspy = async (m, { command, conn, usedPrefix, text }) => {
       try {
         let image = m.message?.imageMessage
                ? await m.download()
                        : /image/.test(m.quoted?.mediaType)
                ? await m.quoted.download()
                        : m.mentionedJid?.[0]
                ? await conn.profilePictureUrl(m.mentionedJid[0], 'image')
                        : await conn.profilePictureUrl(m.quoted?.sender || m.sender, 'image')
        if (!image) throw `Tidak dapat mengambil gambar`
        let level = text || '5', img = await jimp.read(image)
        img.blur(isNaN(level) ? 5 : parseInt(level))
        img.getBuffer('image/jpeg', (err, buffer) => {
                if (err) throw err?.message || `Tidak dapat memburamkan gambar`
                m.reply(buffer)
        })
     } catch (e) {
       console.log(e)
       m.reply(`Terjadi kesalahan, Kirim gambar dengan caption ${usedPrefix + command}`)
     }
}

jarspy.help = ['blur']
jarspy.tags = ['ai']
jarspy.command = /^(blur)$/i

jarspy.limit = 3

export default jarspy