import fetch from "node-fetch"

const jarspy = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh pemakaian:\n${usedPrefix + command} https://open.spotify.com/track/3zakx7RAwdkUQlOoQ7SJRt`
  if (!args[0].match(/spotify/gi)) throw `URL Tidak Ditemukan!`
  await m.react('🕑')
  const urll = args[0]
  try {
    const res = await fetch(`https://api.betabotz.eu.org/api/download/spotify?url=${args[0]}&apikey=${lann}`)
    let jsons = await res.json()
    const { thumbnail, title, name, duration, url } = jsons.result.data
    const { id, type } = jsons.result.data.artist
    let captionvid = ` ∘ Judul: ${title}\n∘ Id: ${id}\n∘ Durasi: ${duration}\n∘ Type: ${type}`
    let pesan = await conn.sendMessage(m.chat, {
      text: captionvid,
      contextInfo: {
        externalAdReply: {
          title: "",
          body: "Powered by",
          thumbnailUrl: thumbnail,
          sourceUrl: thumbnail,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      },
    })
    await conn.sendMessage(m.chat, { audio: { url: url }, mimetype: 'audio/mpeg' }, { quoted: m });
  } catch (e) {
    throw `Server down!`;
  }
}
jarspy.help = ["spotify"]
jarspy.tags = ["downloader"]
jarspy.command = /^(spotify)$/i

jarspy.fail = null

export default jarspy