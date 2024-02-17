import fetch from 'node-fetch'
let bts = []
fetch ('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/batues.txt')
    .then(res => res.text())
    .then(txt => bts = txt.split('\n'))
let jarspy = async (m, { conn }) => {
    let img = bts[Math.floor(Math.random() * bts.length)]
    if (!img) throw img
    await conn.sendFile(m.chat, img, '', 'Bts', m, 0, { thumbnail: await (await fetch(img)).buffer() })
}
jarspy.help = ['bts']
jarspy.tags = ['internet']
jarspy.command = /^(bts)$/i

export default jarspy