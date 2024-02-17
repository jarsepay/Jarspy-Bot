import fetch from 'node-fetch'  

let jarspy = async (m, { conn }) => {
   let res = await fetch('https://official-joke-api.appspot.com/random_joke')
   if (!res.ok) throw 'Tidak Ditemukan'
   let json = await res.json()
   let setup = json.setup
   let punchline = json.punchline
   let yesy = `⌕ Pertanyaan: ${setup}\n\n◦ Jawaban: ${punchline}`
   m.reply(yesy)

}
jarspy.help = ['joke']
jarspy.tags = ['internet']
jarspy.command = /^(joke|lelucon)$/i

export default jarspy