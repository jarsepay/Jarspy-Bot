import fetch from 'node-fetch';

let jarspy = async (m, { command, conn, usedPrefix, text }) => {
  if (!text) throw `Silakan berikan nama Pokemon yang ingin dicari. Contoh pemakaian: ${usedPrefix + command} grookey`

  const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`
  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
  throw `An error occurred: ${json.error}`
 }

  const message = `*Name:* ${json.name}
*ID:* ${json.id}
*Type:* ${json.type}
*Abilities:* ${json.abilities}
*Height:* ${json.height}
*Weight:* ${json.weight}
*Description:* ${json.description}`

  conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m })

}
jarspy.help = ['pokedex']
jarspy.tags = ['internet']
jarspy.command = /^pokedex/i

export default jarspy