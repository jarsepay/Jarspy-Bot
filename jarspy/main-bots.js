/*
  • By Malik
  • Script by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

/*let jarspy = async (m, { conn }) => {
    try {
        const groupId = m.chat;
        const listbot = [
            { number: conn.user.jid, name: conn.user.name, groupId }, 
            ...(conn.user.listbot[groupId] || [])
        ].filter(bot => bot.groupId === groupId);

        const totalBots = listbot.length;
        const formattedText = listbot.map(({ number, name }, index) => `*${index + 1}.* @${number.split('@')[0]} - ${name}`).join('\n');

        await m.reply(
            `📊 *Total Bot*: *${totalBots}* pesan dari *${totalBots}* bot\n\n${formattedText}`,
            null, {
                contextInfo: {
                    mentionedJid: listbot.map(({ number }) => number)
                }
            }
        );
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, 'Terjadi kesalahan.', m);
    }
};
jarspy.help = ['bots'];
jarspy.tags = ['main'];
jarspy.command = /^(bots)$/i;

jarspy.group = true;

export default jarspy;*/