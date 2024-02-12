import fetch from 'node-fetch'

let jarspy = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/sfw/neko')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendFile(m.chat, json.url, json.url, `Neko`.trim(), m)
    //conn.sendButton(m.chat, 'Istri kartun', author, json.url, [['neko', `${usedPrefix}neko`]], m)
}
jarspy.help = ['neko']
jarspy.tags = ['anime']
jarspy.command = /^(neko)$/i
//MADE IN ERPAN 1140 BERKOLABORASI DENGAN BTS
export default jarspy