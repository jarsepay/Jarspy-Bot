import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const jimp_1 = require('jimp')

let jarspy = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let media = await q.download()
			let { img } = await pepe(media)
			await conn.query({
				tag: 'iq',
				attrs: {
					to: m.chat,
					type:'set',
					xmlns: 'w:profile:picture'
				},
				content: [
					{
						tag: 'picture',
						attrs: { type: 'image' },
						content: img
					}
				]
			})
			m.reply(`Admin @${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} telah mengganti ikon grup!`, null, { mentions: [m.sender] })
		} catch (e) {
			console.log(e)
			m.reply(`Terjadi kesalahan, coba lagi nanti.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
}

jarspy.help = ['setppgc']
jarspy.tags = ['group']
jarspy.command = /^(setppgc)$/i

jarspy.admin = true
jarspy.botAdmin = true
jarspy.group = true

export default jarspy

async function pepe(media) {
	const jimp = await jimp_1.read(media)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
	}
}
