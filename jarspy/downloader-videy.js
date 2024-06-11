import axios from 'axios'
import cheerio from 'cheerio'

let jarsepay = async(m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) return m.reply(`‣ Example: ${usedPrefix + command} https://videy.co/v?id=K7wdQnbm`)
	if (!/^http(s):\/\/videy\.co/i.test(args[0])) return m.reply('Pastikan link yang diberikan berasal dari videy.')

	try {
		let result = await videy(args[0])
		let video = await conn.sendFile(m.chat, result, null, '*≡ Downloader - Videy*', m)
	} catch (error) {
		console.log(error)
		await conn.reply(m.chat, 'Error: ' + error.message, m)
	}
}
jarsepay.help = ['videy']
jarsepay.tags = ['downloader']
jarsepay.command = ['videy', 'videydl']

jarsepay.limit = true

export default jarsepay

async function videy(url) {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    const videoSrc = $('source[type="video/mp4"]').attr('src')
    return videoSrc
  } catch (error) {
    console.error(`Error fetching the URL: ${error.message}`)
  }
}