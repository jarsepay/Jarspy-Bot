import fetch from "node-fetch"

let jarsepay = async (m, { args, usedPrefix, command }) => {
    let lang, text
    if (args.length >= 2) {
        lang = args[0] ? args[0] : "id", text = args.slice(1).join(" ")
    } else if (m.quoted && m.quoted.text) {
        lang = args[0] ? args[0] : "id", text = m.quoted.text
    } else throw `‣ Example: ${usedPrefix + command} Midnight In Tokyo`
    try {
    const prompt = encodeURIComponent(text)
        let reis = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + lang + "&dt=t&q=" + prompt)
        let res = await reis.json()
        let lister = Object.keys(await langList())
        let supp = `Error: Bahasa *${lang}* Tidak Support`
        if (!lister.includes(lang)) return m.reply(`‣ Example: ${usedPrefix + command} Midnight In Tokyo\n` + lister.map((v, index) => `${index +1}. ${v}`).join("\n"))

        let Detect = (res[2].toUpperCase() ? res[2].toUpperCase() : "US")
        let ToLang = (lang.toUpperCase())
        let caption = `
*${Detect} ‣ ${ToLang}:* ${res[0][0][0]}
`.trim()
        await m.reply(caption, null, m.mentionedJid ? {
        mentions: conn.parseMention(caption)
    } : {})
    } catch (error) {
        console.error(error)
        m.reply('Error: ' + error.message)
    }
}

jarsepay.help = ['translate']
jarsepay.tags = ['tools']
jarsepay.command = ['tr', 'translate']

jarsepay.limit = true

export default jarsepay

async function langList() {
    let data = await fetch("https://translate.google.com/translate_a/l?client=webapp&sl=auto&tl=en&v=1.0&hl=en&pv=1&tk=&source=bh&ssel=0&tsel=0&kc=1&tk=626515.626515&q=")
        .then((response) => response.json())
    return data.tl
}