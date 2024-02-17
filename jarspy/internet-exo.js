import fetch from 'node-fetch'

let arr = []
fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/exo.txt')
    .then(res => res.text())
    .then(txt => arr = txt.split('\n'))
let jarspy = async (m, { conn }) => {
    let img = arr[Math.floor(Math.random() * arr.length)]
    if (!img) throw img
    await conn.sendFile(m.chat, img, '', 'Exo', m, 0, { thumbnail: await (await fetch(img)).buffer() })
}
jarspy.help = ['exo']
jarspy.tags = ['internet']
jarspy.command = /^(exo)$/i

export default jarspy