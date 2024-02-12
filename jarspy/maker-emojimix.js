import { sticker } from '../lib/sticker.js'
import fs from 'fs'
import fetch from 'node-fetch'

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
    if (!text || !text.includes('+')) throw `Contoh pemakaian: ${usedPrefix + command} 😅+🤔`
    let [l, r] = text.split`+`
    if (!l) throw 'Emoji 1 tidak boleh kosong'
    if (!r) throw 'Emoji 2 tidak boleh kosong'
    const res = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(l)}_${encodeURIComponent(r)}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.results) throw 'Error!'
    try {
        const stiker = await sticker(false, json.results[0].url, global.packname, global.author)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', 'done', m)
    } catch (e) {
        console.log(e)
        m.reply('Emoji tidak bisa digunakan')
    }
}

jarspy.help = ['emojimix']
jarspy.tags = ['maker']
jarspy.command = /^(emojimix)$/i

export default jarspy