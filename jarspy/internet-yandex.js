import fetch from 'node-fetch'

let jarsepay = async (m, { command, usedPrefix, conn, args }) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `‣ Example: ${usedPrefix + command} Midnight In Tokyo`

    try {
        if (command === 'yandex') {
            const param = {
                api_key: 'd52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562',
                engine: 'yandex',
                text: text
            }
            let all = await generateSerpApiUrl(param)
            let caption = all.organic_results.map((v, index) => `${"*⌜ " + ++index + " ⌟*"}\n_*${v.title || 'Tidak terdeteksi'}*_\n‣ Link: ${v.link || 'Tidak terdeteksi'}\n‣ Snippet: ${v.snippet || 'Tidak terdeteksi'}`).join("\n\n")
            await conn.reply(m.chat, caption, m)
        }
        if (command === 'yandeximg') {
            const param = {
                api_key: 'd52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562',
                engine: 'yandex_images',
                text: text
            }
            let all = await generateSerpApiUrl(param)
            let caption = all.images_results[0]
            await conn.sendMessage(m.chat, {
                image: {
                    url: caption.original || caption.thumbnail
                },
                caption: `‣ *Title:* ${caption.title}\n‣ *Snippet:* ${caption.snippet}\n\n‣ *Source:* ${caption.source}`,
                mentions: [m.sender]
            }, {
                quoted: m
            })
        }
    } catch (error) {
        console.log(error)
        conn.reply(m.chat, 'Error: ' + error.message, m)
    }
}

jarsepay.help = ['yandex', 'yandeximg']
jarsepay.tags = ['internet']
jarsepay.command = ['yandex', 'yandeximg']

jarsepay.limit = 5

export default jarsepay

async function generateSerpApiUrl(data) {
    const params = new URLSearchParams(data)
    const url = `https://serpapi.com/search.json?${params.toString()}`

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Request failed')
        }

        const result = await response.json()
        return result
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error.message}`)
    }
}