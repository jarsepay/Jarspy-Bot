import fetch from 'node-fetch'

let jarspy = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/sfw/shinobu')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendFile(m.chat, json.url, json.url, `Shinobu`.trim(), m)
    //conn.sendButton(m.chat, 'Shinobu', author, json.url, [['shinobu', `${usedPrefix}shinobu`]], m)
}
jarspy.help = ['shinobu']
jarspy.tags = ['anime']
jarspy.command = /^(shinobu)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
export default jarspy