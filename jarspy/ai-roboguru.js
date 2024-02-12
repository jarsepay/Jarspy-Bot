import fetch from 'node-fetch'

let jarspy = async (m, { conn, usedPrefix, command, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Contoh pemakaian: ${usedPrefix}roboguru 1+1`, m)
  }
  let apikey = `${global.lolkey}`
  let query = encodeURIComponent(args.join(' '))
  let grade = 'sma'
  let subject = 'sejarah'
  let url = `https://api.lolhuman.xyz/api/roboguru?apikey=${apikey}&query=${query}&grade=${grade}&subject=${subject}`	
	conn.sendMessage(m.chat, {
		react: {
			text: '',
			key: m.key,
		}
	})
  let res = await fetch(url)
  let json = await res.json()
  if (json.status !== 200) {
    return conn.reply(m.chat, 'Maaf, terjadi kesalahan saat mengambil data dari server', m)
  }
  let result = json.result
  if (result.length === 0) {
    return conn.reply(m.chat, 'Maaf, tidak dapat menemukan jawaban untuk pertanyaan itu', m)
  }
  let answer = result[0].answer
  let message = `*Pertanyaan:* ${result[0].question}\n\n*Jawaban:* ${answer}`
  conn.reply(m.chat, message, m)
}

jarspy.help = ['roboguru']
jarspy.tags = ['ai']
jarspy.command = /^(roboguru)$/i
jarspy.limit = 5

export default jarspy 