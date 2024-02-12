import fetch from 'node-fetch'

let jarspy = async (m, { text }) => {
	if (!text) throw 'Ketik apa yang ingin kamu cari'
	let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
	let { objects } = await res.json()
	if (!objects.length) throw `Hasil "${text}" tidak ditemukan`
	let txt = objects.map(({ package: pkg }) => {
		return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
	}).join`\n\n`
	m.reply(txt)
}
jarspy.help = ['npmsearch']
jarspy.tags = ['tools']
jarspy.command = /^npm(js|search)?$/i

export default jarspy