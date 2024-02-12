import fs from 'fs'
import syntaxError from 'syntax-error'
import path from 'path'
import util from 'util'
import Connection from '../lib/connection.js'

const _fs = fs.promises

let jarspy = async (m, { conn, text, usedPrefix, command, __dirname }) => {
if (m.sender === `${global.nomorowner}@s.whatsapp.net`) {
    if (!text) throw `
Contoh pemakaian: ${usedPrefix}savefile main.js
        ${usedPrefix}saveplugin owner
`.trim()
    if (!m.quoted) throw `Balas media/text yang ingin disimpan`
    if (/p(lugin)?/i.test(command)) {
        let filename = text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js')
        const error = syntaxError(m.quoted.text, filename, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        })
        if (error) throw error
        const pathFile = path.join(__dirname, filename)
        // TODO: make confirmation to save if file already exists
        // if (fs.existSync(pathFile, fs.constants.R_OK)) return m.reply(`File ${filename} sudah ada`)
        await _fs.writeFile(pathFile, m.quoted.text)
        m.reply(`
*tersimpan ke ${filename}*`.trim())
    } else {
        const isJavascript = m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text)
        if (isJavascript) {
            const error = syntaxError(m.quoted.text, text, {
                sourceType: 'module',
                allowReturnOutsideFunction: true,
                allowAwaitOutsideFunction: true
            })
            if (error) throw error
            await _fs.writeFile(text, m.quoted.text)
            m.reply(`
*tersimpan ke ${text}*`.trim())
        } else if (m.quoted.mediaMessage) {
            const media = await m.quoted.download()
            await _fs.writeFile(text, media)
            m.reply(`tersimpan ke *${text}*`)
        } else {
            throw '*Tidak didukung*'
        }
    }
    return
 }
  await conn.reply(m.chat, `Fitur ini hanya dapat digunakan oleh ${namaowner}`, m)
}
jarspy.help = ['savefile']
jarspy.tags = ['owner']
jarspy.command = /^(save|s)(p(lugin)?|(f(ile)?))$/i

export default jarspy