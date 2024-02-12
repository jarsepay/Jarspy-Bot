/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import path from 'path';
import db from '../lib/database/index.js'

let jarspy = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw 'Siapa yang mau direset?'
    let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!who) return m.reply('Tag target atau ketik nomornya')
    const user = await db.users.get(who)
    if (!user) return m.reply(`Pengguna ${who} tidak ada dalam database`)
    
    // Menghapus data pengguna dari basis data
    const deleteSuccess = await db.users.delete(who);
    if (deleteSuccess) {
        /*conn.reply(who, 'Data kamu telah dihapus oleh Owner');*/
        conn.reply(m.chat, `Berhasil menghapus data *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* dari database`, null, { mentions: [who] });
    } else {
        conn.reply(m.chat, `Gagal menghapus data *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* dari database`, null, { mentions: [who] });
    }
}

jarspy.help = ['reset']
jarspy.tags = ['owner']
jarspy.command = /^reset$/i
jarspy.owner = true

jarspy.disabled = false

export default jarspy;