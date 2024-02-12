/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch';
const pagePre = 40;
const apiUrl = 'https://www.seaart.ai/api/v1/artwork/list';

const fetchData = async (requestData) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const {
            data
        } = await response.json();
        const items = data.items;

        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('No items found.');
        }
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error.message;
    }
};

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
    } else return m.reply("Apa gambar yang ingin dicari?")
    await m.react('🕑')
    const requestData = {
        page: 1,
        page_size: pagePre,
        order_by: 'new',
        type: 'community',
        keyword: text,
        tags: []
    };
    try {
        const result = await fetchData(requestData);
        await conn.sendMessage(m.chat, {
            image: {
                url: result.banner.url
            },
            caption: `Prompt: ${result.prompt}\nModel ID: ${result.model_id}\nAuthor: ${result.author.name}`,
            mentions: [m.sender]
        }, {
            quoted: m
        });
    } catch (error) {
        console.error('Error in example usage:', error);
        await m.reply(error.message);
    }
}
jarspy.help = ["seaart"]
jarspy.tags = ["ai"]
jarspy.command = /^(seaart)$/i
export default jarspy