import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let jarspy = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  conn.reply(m.chat, `▢ *L I N K :*
${link}
▢ *U K U R A N :* ${media.length} Byte
▢ *K e d a l u w a r s a :* ${isTele ? 'Tidak ada' : 'Unknown'}`, m)
}
jarspy.help = ['upload', 'tourl']
jarspy.tags = ['tools']
jarspy.command = /^(tourl|upload)$/i
jarspy.limit = 5
export default jarspy