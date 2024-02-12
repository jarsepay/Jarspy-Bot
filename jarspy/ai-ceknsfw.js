import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import {
    webp2png
} from '../lib/webp2mp4.js'
import axios from 'axios'

let jarspy = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    var out

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/video/g.test(mime)) {
        if ((q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
    }
    if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command}`)
    let img = await q.download?.()

    if (/webp/g.test(mime)) {
        out = (await webp2png(img))
    } else if (/image/g.test(mime)) {
        out = (await uploadImage(img))
    } else if (/video/g.test(mime)) {
        out = (await uploadFile(img))
    } else if (/gif/g.test(mime)) {
        out = (await uploadFile(img))
    } else if (/viewOnce/g.test(mime)) {
        out = (await uploadFile(img))
    }
    await m.react('🕑')
    try {
        const apiResponse = await analyzeImage(out);
        const {
            items
        } = apiResponse.api4ai;
        const nsfwScore = (items.find(item => item.label === "nsfw") || {}).likelihood_score * 100;
        const sfwScore = (items.find(item => item.label === "sfw") || {}).likelihood_score * 100;

        await m.reply(`*[ NSFW ]*\n   - Score: ${nsfwScore.toFixed(2)}%\n*[ SFW ]*   \n- Score: ${sfwScore.toFixed(2)}%`);
    } catch (e) {
        conn.reply(m.chat, "Error: " + e.message, m)
    }
}
jarspy.help = ['ceknsfw']
jarspy.tags = ['ai']
jarspy.command = /^(ceknsfw|nsfwcheck)$/i

export default jarspy

const analyzeImage = async (file_url) => {
    const options = {
        method: 'POST',
        url: 'https://api.edenai.run/v2/image/explicit_content',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTBlOGQ5YWUtMmExNC00YTA1LTgzZWMtMWY0ZThhMDczMDIwIiwidHlwZSI6ImFwaV90b2tlbiJ9.DoMaXPi7Sd7I-LpzwNQ4bd7Sd7r_4rtT1aGziC03uSs'
        },
        data: {
            response_as_dict: true,
            attributes_as_list: false,
            show_original_response: false,
            providers: 'api4ai',
            file_url
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};