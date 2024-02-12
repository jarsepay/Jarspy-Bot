/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { args, isPrems, conn: _conn, conn }) => {
    let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!who) {
    	who = m.sender
    }
    
    let user = await db.users.get(who)
    if (!user) return m.reply(`Pengguna ${who} tidak ada dalam database`)
    
    if (user.jail && (!user.jailExpired || user.jailExpired > Date.now())) {
        if (user.jailExpired) {
            let remainingTime = user.jailExpired - Date.now()
            let minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
            let seconds = Math.floor((remainingTime / 1000) % 60)
            if (who == m.sender) {
                m.reply(`Kamu masih berada di penjara\nSisa waktu penjara: ${minutes} menit ${seconds} detik`)
                return
            }
            m.reply(`@${(who || '').replace(/@s\.whatsapp\.net/g, '')} masih berada di penjara\nSisa waktu penjara: ${minutes} menit ${seconds} detik`, null, { mentions: [who] })
        }
    } else if (user.jail == true){
        if (who == m.sender) {
            m.reply('Kamu dipenjara seumur hidup!')
            return
        }
        m.reply(`@${(who || '').replace(/@s\.whatsapp\.net/g, '')} telah dipenjara seumur hidup`, null, { mentions: [who] })
    } else {
        if (who == m.sender) {
            m.reply('Kamu tidak sedang dipenjara')
            return
        }
        m.reply(`@${(who || '').replace(/@s\.whatsapp\.net/g, '')} tidak sedang dalam penjara`, null, { mentions: [who] })
    }
}

jarspy.help = ['jailstatus']
jarspy.tags = ['roleplay']
jarspy.command = /^(checkjail|cj|statuspenjara|jailstatus)$/i

export default jarspy