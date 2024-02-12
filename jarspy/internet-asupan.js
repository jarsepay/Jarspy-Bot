import fetch from "node-fetch";

let jarspy = async (m, { conn, command }) => {
    let apiUrl = `https://aemt.me/${command}`
    let buffer = await fetch(apiUrl)
        .then(res => res.buffer())
        .catch(async (err) => {
        console.log (err)
            m.reply(`Error: ${err}`)
            // Handle the error as needed
        })
    if (buffer) {
        conn.sendFile(m.chat, buffer, 'hasil.jpg', `Random ${command}`, m)
    } else {
m.reply('Error');
    }
}

jarspy.help = jarspy.command = ['china','vietnam','thailand','indonesia','korea','japan','malaysia']
jarspy.tags = ['internet']

export default jarspy