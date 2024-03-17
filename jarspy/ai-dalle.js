import fetch from 'node-fetch'

let jarsepay = async (m, { conn, text, usedPrefix, command }) => {

	if (!text) throw `‣ Example: ${usedPrefix + command} Midnight In Tokyo`

	try {
		let url = `https://aemt.me/dalle?text=${text}`
		await conn.sendFile(m.chat, await (await fetch(url)).buffer(), null, `Prompt: ${text}`, m)
	} catch (error) {
		console.log(error)
		conn.reply(m.chat, 'Error: ' + error.message, m)
	}
}

jarsepay.help = ['dalle']
jarsepay.tags = ['ai']
jarsepay.command = ['dalle']

jarsepay.limit = 5

export default jarsepay
