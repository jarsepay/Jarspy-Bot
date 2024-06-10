import fetch from 'node-fetch'

let jarsepay = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `‣ Example: ${usedPrefix + command} Elaina (karakter pada anime/manga)`

    try {

        const data = await fetch(`https://weeb-api.vercel.app/character?search=${text}`)
        const result = await data.json()

        const firstCharacter = result[0]

        let message = `*‣ ID:* ${firstCharacter.id}\n`
        message += `*‣ Nama:* ${firstCharacter.name.full}\n`
        message += `*‣ Umur:* ${firstCharacter.age || 'Tidak diketahui.'}\n`
        message += `*‣ Gender:* ${firstCharacter.gender || 'Tidak diketahui.'}\n`
        message += `*‣ Tanggal Lahir:* ${firstCharacter.dateOfBirth || 'Tidak diketahui.'}\n\n`
        message += `*‣ Deskripsi:* ${firstCharacter.description || 'Tidak diketahui.'}\n\n`
        message += `*‣ Source:* ${firstCharacter.siteUrl || 'Tidak diketahui.'}`

        conn.sendFile(m.chat, firstCharacter.imageUrl, null, message, m)

    } catch (error) {
        console.log(error)
        conn.reply(m.chat, 'Karakter tidak ditemukan/error pada website.', m)
    }
}

jarsepay.help = ['character']
jarsepay.tags = ['internet']
jarsepay.command = ['character']

jarsepay.limit = true

export default jarsepay