import cheerio from 'cheerio'
import fetch from 'node-fetch'

let jarspy = async (m, { conn, text }) => {
	if (text.match(/(https:\/\/sfile.mobi\/)/gi)) {
		let res = await sfileDl(text)
		if (!res) throw '*Terjadi Kesalahan!*'
		await m.reply(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n_Mengirim File..._')
		conn.sendMessage(m.chat, { document: { url: res.download }, fileName: res.filename, mimetype: res.mimetype }, { quoted: m })
	} else if (text) {
		let [query, page] = text.split`|`
		let res = await sfileSearch(query, page)
		if (!res.length) throw `*Pencarian "${text}" tidak ditemukan*`
		res = res.map((v) => `◦ *Judul:* ${v.title}\n◦ *Ukuran:* ${v.size}\n◦ *Link:* ${v.link}`).join`\n\n`
		m.reply(res)
	} else throw '*Masukkan Pencarian/Linknya*'
}
jarspy.help = jarspy.alias = ['sfile']
jarspy.tags = ['downloader']
jarspy.command = /^(sfile)$/i
jarspy.limit = 5

export default jarspy

async function sfileSearch(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, size: size.replace(')', ''), link })
	})
	return result
}

async function sfileDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let filename = $('div.w3-row-padding').find('img').attr('alt')
	let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
	let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
	let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
	return { filename, filesize, mimetype, download }
}