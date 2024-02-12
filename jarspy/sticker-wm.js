import { addExif } from '../lib/sticker.js'

let jarspy = async (m, { conn, command, usedPrefix, text }) => {
  if (!m.quoted) throw `Contoh pemakaian: ${usedPrefix + command} ${namaowner}`
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw 'Balas stiker'
    let img = await m.quoted.download()
    if (!img) throw 'Balas stiker'
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
    else throw 'Konversi gagal'
  }
}
jarspy.help = ['watermark']
jarspy.tags = ['sticker']
jarspy.command = /^(wm|watermark)$/i

export default jarspy
