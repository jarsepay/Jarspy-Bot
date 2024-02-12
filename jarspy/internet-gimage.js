/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { googleImage } from '@bochilteam/scraper';

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh pemakaian: ${usedPrefix}${command} Logo FlatIcon`;

    let prohibitedTerms = ['hentai', 'telanjang', 'fuck', 'naked', 'bokep', 'porn']; // Add more terms if needed

    let queryWithoutSpaces = text.replace(/\s/g, '').toLowerCase();

    if (prohibitedTerms.some(term => queryWithoutSpaces.includes(term))) {
        return conn.reply(m.chat, '❌ Permintaan pencarian terlarang', m);
    }

    const res = await googleImage(text);
    conn.sendFile(
        m.chat,
        res.getRandom(),
        'gimage.jpg',
        `*── 「 GOOGLE IMAGE 」 ──*\n\nHasil Dari *${text}*`.trim(),
        m
    );
};

jarspy.help = ['image'];
jarspy.tags = ['internet'];
jarspy.command = /^(gimage|image)$/i;

export default jarspy;