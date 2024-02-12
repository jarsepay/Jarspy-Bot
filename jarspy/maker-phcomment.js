import fetch from 'node-fetch'
let jarspy = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  let response = args.join(' ').split('|')
  if (!args[0]) throw `Contoh pemakaian: ${usedPrefix}${command} komennya|usernamenya`
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let res = `https://api.lolhuman.xyz/api/phcomment?apikey=${global.lolkey}&img=https://telegra.ph/file/570cd42fdac7aa5fa5c1e.jpg&text=${response[0]}&username=${response[1]}`
  conn.sendFile(m.chat, res, 'phcomments.jpg', `*Selesai*`, m, false)
}
jarspy.help = ['phcomment']
jarspy.tags = ['maker']
jarspy.command = /^(phcomment)$/i
jarspy.limit = 3

export default jarspy