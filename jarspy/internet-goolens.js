import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
const {
    generateSerpApiUrl
} = await (await import('../lib/serpapi.js'));

let jarspy = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let [urutan] = args
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'Balas/reply gambarnya'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    try {
        const param = {
            api_key: 'd52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562',
            engine: 'google_lens',
            url: link
        };
        let all = await generateSerpApiUrl(param)
        let data = all.visual_matches
        if (!urutan) return m.reply("Input query!\nContoh pemakaian:\n.goolens [nomor]\n\nPilih angka yang ada\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\nContoh pemakaian:\n.goolens [nomor]\n\nPilih angka yang ada\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\nContoh pemakaian:\n.goolens [nomor]\n\nPilih angka yang ada\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1]
        let caption = `Hasil

• *Deskripsi:* ${out.title || 'Tidak ada'}
• *Source:* ${out.source || 'Tidak ada'}
• *Link:* ${out.link || 'Tidak ada'}
• *Thumbnail:* ${out.thumbnail || 'Tidak ada'}
`;

        await m.reply(caption)
    } catch (e) {
        await m.reply(`Error: ${e}`)
    }
}
jarspy.help = ["goolens"]
jarspy.tags = ["internet"]
jarspy.command = /^(goolens)$/i
export default jarspy