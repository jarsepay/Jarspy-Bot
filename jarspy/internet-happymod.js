import axios from 'axios'
import cheerio from 'cheerio'
let jarspy = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `Contoh pemakaian: ${usedPrefix + command} whatsapp`
    let result = await happymod(text)
    let teks = result.map((v, i) => {
        return `
*${i + 1}.* ${v.name}
◦ Link: ${v.link}
`.trim()
    }).filter(v => v).join('\n\n\n')
    await m.reply(teks)
}
jarspy.help = ['happymod']
jarspy.tags = ['internet']
jarspy.command = /^happymod$/i

jarspy.limit = true

export default jarspy

function happymod(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.happymod.com/search.html?q=${query}`).then(async tod => {
            const $ = cheerio.load(tod.data)
            let hasil = []
            $("div.pdt-app-box").each(function(c, d) {
                let name = $(d).find("a").text().trim();
                let icon = $(d).find("img.lazy").attr('data-original');
                let link = $(d).find("a").attr('href');
                let link2 = `https://www.happymod.com${link}`
                const Data = {
                    icon: icon,
                    name: name,
                    link: link2
                }
                hasil.push(Data)
            })
            resolve(hasil);
        }).catch(reject)
    });
}