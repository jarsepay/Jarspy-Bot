import fetch from 'node-fetch'

let jarspy = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendFile(m.chat, json.url, json.url, `Waifu`.trim(), m)
    //conn.sendButton(m.chat, 'Istri Anime', author, json.url, [['waifu', `${usedPrefix}waifu`]], m)
}
jarspy.help = ['waifu']
jarspy.tags = ['anime']
jarspy.command = /^(waifu)$/i

export default jarspy