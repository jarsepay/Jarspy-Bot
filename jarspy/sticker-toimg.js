import { spawn } from 'child_process'
import { format } from 'util'
import { webp2png } from '../lib/webp2mp4.js'

let jarspy = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `Balas stiker dengan perintah *${usedPrefix + command}*`
  if (!m.quoted) throw notStickerMessage
  let q = m.quoted
  if (!/sticker/.test(q.mediaType)) throw notStickerMessage
  let sticker = await q.download()
  if (!sticker) throw sticker
  if (global.support.convert ||
    global.support.magick ||
    global.support.gm) {
    let bufs = []
    const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []), 'convert', 'webp:-', 'png:-']
    let im = spawn(_spawnprocess, _spawnargs)
    im.on('error', e => m.reply(format(e)))
    im.stdout.on('data', chunk => bufs.push(chunk))
    im.stdin.write(sticker)
    im.stdin.end()
    im.on('exit', () => {
      conn.sendFile(m.chat, Buffer.concat(bufs), 'image.png', author, m)
    })

  } else {
    let out = await webp2png(sticker).catch(_ => null) || Buffer.alloc(0)
    await conn.sendFile(m.chat, out, 'out.png', 'Selesai', m)
  }
}
jarspy.help = ['toimg']
jarspy.tags = ['sticker']
jarspy.command = /^toimg$/i

export default jarspy