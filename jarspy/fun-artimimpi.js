import { artimimpi } from '@bochilteam/scraper';

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Contoh pemakaian: ${usedPrefix + command} Ular`
	try {
		let anu = await artimimpi(text)
		if (anu.length != 0) {
			let ini_txt = `Arti Mimpi : ${text}\n\n`
			for (var x of anu) {
				ini_txt += `⭔ _${x}_\n\n`
			}
			m.reply(ini_txt)
		} else {
			m.reply(`Tidak ditemukan tafsir mimpi *${text}*, cari dengan kata kunci yang lain.\nContoh pemakaian: *${usedPrefix + command} Ular*`)
		}
	} catch (e) {
		console.log(e)
		m.reply(`Error: ${e}`)
	}
}

jarspy.help = ['artimimpi']
jarspy.tags = ['fun']
jarspy.command = /^artimimpi$/i

export default jarspy