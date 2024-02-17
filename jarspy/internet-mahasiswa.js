import fetch from 'node-fetch';

let jarspy = async (m, { command, conn, usedPrefix, text }) => {
  if (!text) throw `Contoh pemakaian: ${usedPrefix + command} dika`
  await m.react('🕑')
  let res = await fetch('https://api-frontend.kemdikbud.go.id/hit_mhs/' + text)
  if (!res.ok) throw 'Tidak ditemukan'
  let json = await res.json()
  let message = ''

  json.mahasiswa.forEach(data => {
    let nama = data.text
    let websiteLink = data['website-link']
    let website = `https://pddikti.kemdikbud.go.id${websiteLink}`
    message += `\n◦ Nama : ${nama}\n\n◦Data Ditemukan pada website : ${website}\n\n\n`
  })
  
  m.reply(message)
}
jarspy.help = ['mahasiswa']
jarspy.tags = ['internet']
jarspy.command = /^(mahasiswa)$/i

export default jarspy