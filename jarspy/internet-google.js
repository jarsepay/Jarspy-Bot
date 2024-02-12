import axios from "axios"
import fetch from "node-fetch"
import {
    googleIt
} from "@bochilteam/scraper"

let jarspy = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw 'Masukkan teks atau reply teks yang ingin di cari'
    let google_img = "https://telegra.ph/file/cf62f2b8648a352548978.jpg"
    try {
            let search = await googleIt(text)
            let caption = search.articles.map((v, index) => `${" " + ++index + " "}\n*${v.title || 'Tidak terdeteksi'}*\n  *○ Link:* ${v.url || 'Tidak terdeteksi'}\n  *○ Snippet:* ${v.description || 'Tidak terdeteksi'}`).join("\n\n")
            if (!caption.length) throw m.reply(`*Pencarian "${text}" Tidak Ditemukan*`)
        await conn.sendFile(m.chat, google_img, "", caption, m)
        } catch (e) {
            try {
                let API_KEY = "7d3eb92cb730ed676d5afbd6c902ac1f"
                let search = await (await fetch("http://api.serpstack.com/search?access_key=" + API_KEY + "&type=web&query=" + text)).json()
                let caption = search.organic_results.map((v, index) => `${" " + ++index + " "}\n*${v.title || 'Tidak terdeteksi'}*\n  *○ Link:* ${v.url || 'Tidak terdeteksi'}\n  *○ Snippet:* ${v.snippet || 'Tidak terdeteksi'}`).join("\n\n")
        await conn.sendFile(m.chat, google_img, "", caption, m)
            } catch (e) {
                await m.reply(`Error: ${e}`)
            }
        }
}
jarspy.help = ["google"]
jarspy.tags = ["internet"]
jarspy.command = /^google?$/i
jarspy.register = false
jarspy.limit = 3
export default jarspy