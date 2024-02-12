import fetch from 'node-fetch'
import { webp2png } from '../lib/webp2mp4.js'

let jarspy = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m,
		mime = (q || q.msg).mimetype || q.mediaType || ''
	if (/image/.test(mime)) {
		let url = await webp2png(await q.download()),
			res = await fetch(API('https://api.ocr.space', '/parse/imageurl', { apikey: '8e65f273cd88957', url }))
		if (res.status !== 200) throw res.statusText
		let json = await res.json()
		m.reply(json?.ParsedResults?.[0]?.ParsedText)
	} else throw 'Balas gambar'
}

jarspy.help = ['ocr', 'totext']
jarspy.tags = ['tools']
jarspy.command = /^(ocr|totext)$/i
jarspy.limit = 3

export default jarspy