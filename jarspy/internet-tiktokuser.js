import fetch from 'node-fetch'

let jarsepay = async (m, { args, command, conn, usedPrefix, text }) => {
    let teks = text.toLowerCase()
    if (!teks) throw `‣ Example: ${usedPrefix + command} zeejkt48`

    try {
        const proc = await fetch(`https://aemt.me/download/asupantt?username=${teks}`)
        const res = await proc.json()
        const data = res.result.data

        let caption = `*≡ Tiktok - Random Video User*\n\n`
        caption += `‣ *Caption:* ${data.caption}\n`
        caption += `‣ *Username:* ${data.author.username}\n`
        caption += `‣ *Nickname:* ${data.author.nickname}\n`;
        caption += `‣ *Views:* ${data.stats.play_count} views\n`
        caption += `‣ *Like:* ${data.stats.digg_count} like\n`
        caption += `‣ *Shared:* ${data.stats.share_count} share\n`
        caption += `‣ *Komentar:* ${data.stats.comment_count} komentar\n`;
        caption += `‣ *Durasi:* ${data.duration} detik`

        conn.sendFile(m.chat, data.video, null, caption, m)
    } catch (error) {
        console.log(error)
        conn.reply(m.chat, 'Video tidak tersedia pada username ini.', m)
    }
}
jarsepay.help = ['tiktokuser']
jarsepay.tags = ['internet']
jarsepay.command = ['ttuser', 'tiktokuser']

jarsepay.limit = 8

export default jarsepay