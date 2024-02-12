// Update By Xnuvers007

import fetch from 'node-fetch'

var jarspy = async (m, { conn, text }) => {
if (!text) throw `Berikan judul manga yang ingin kamu cari`
conn.reply(m.chat, 'Sedang mencari manga... Silahkan tunggu', m)
let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
if (!res.ok) throw 'Tidak ditemukan'
let json = await res.json()
let { chapters, url, type, score, scored, scored_by, rank, popularity, members, background, status, volumes, synopsis, favorites } = json.data[0]
let judul = json.data[0].titles.map(jud => `${jud.title} [${jud.type}]`).join('\n');
let xnuvers007 = json.data[0].authors.map(Xnuvers007 => `${Xnuvers007.name} (${Xnuvers007.url})`).join('\n');
let genrenya = json.data[0].genres.map(xnvrs007 => `${xnvrs007.name}`).join('\n');
  
let animeingfo = `*-----• MANGA INFO •-----*
◦ Judul: ${judul}
◦ Chapter: ${chapters}
◦ Transmisi: ${type}
◦ Status: ${status}
◦ Genre: ${genrenya}
◦ Volumes: ${volumes}
◦ Favorit: ${favorites}
◦ Skor: ${score}
◦ Diskor: ${scored}
◦ Diskor oleh: ${scored_by} Pembaca
◦ Rank: ${rank}
◦ Popularitas: ${popularity}
◦ Anggota: ${members}
◦ Tautan: ${url}
◦ Pengarang: ${xnuvers007}
◦ Latar Belakang: ${background}
◦ Sinopsis: ${synopsis}
`
conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'manga.jpg', animeingfo, m)
}
jarspy.help = ['mangainfo']
jarspy.tags = ['anime']
jarspy.command = /^(mangainfo|infomanga)$/i
jarspy.limit = 5

export default jarspy