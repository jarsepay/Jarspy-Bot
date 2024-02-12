import axios from "axios"

let jarspy = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `Contoh pemakaian: ${usedPrefix}${command} anime theme with 2 couple watching sunset in a high tourist spot`
    await m.react('🕑')

    try {
        let data = await textToImage(text)
        if (data) {

            await conn.sendFile(m.chat, data.result_url, '', `Gambar untuk: ${text}`, m, false, {
                mentions: [m.sender]
            });

        }
    } catch (e) {
        await m.reply(`Error: ${e}`)
    }
}
jarspy.help = ["photoleap"]
jarspy.tags = ["ai"];
jarspy.command = /^(photoleap)$/i
jarspy.limit = 10

export default jarspy

/* New Line */
async function textToImage(text) {
    try {
        const {
            data
        } = await axios.get("https://tti.photoleapapp.com/api/v1/generate?prompt=" + text)
        return data;
    } catch (err) {
        return null;
    }
}