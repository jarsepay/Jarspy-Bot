import fetch from "node-fetch"
const link = 'https://data.bmkg.go.id/DataMKG/TEWS/'
var jarspy = async (m, {
  conn,
  text, 
  usedPrefix, 
  command 
  }) => {
	try {
		let res = await fetch(link+'autogempa.json')
		let anu = await res.json()
		anu = anu.Infogempa.gempa
		let txt = `▢ *${anu.Wilayah}*\n\n`
		txt += `◦ Tanggal : ${anu.Tanggal}\n`
		txt += `◦ Waktu : ${anu.Jam}\n`
		txt += `◦ Potensi : *${anu.Potensi}*\n\n`
		txt += `◦ Magnitude : ${anu.Magnitude}\n`
		txt += `◦ Kedalaman : ${anu.Kedalaman}\n`
		txt += `◦ Koordinat : ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\nDirasakan : ${anu.Dirasakan}` : ''}`
		await conn.sendMessage(m.chat, {
text: txt,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: wmtitle,
body: wmbody,
thumbnailUrl: link+anu.Shakemap,
sourceUrl: sig,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`Error: ${e}`)
	}
};
jarspy.command = jarspy.help = ['infogempa', 'gempa']
jarspy.tags = ['internet']

export default jarspy