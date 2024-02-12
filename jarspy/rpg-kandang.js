/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let jarspy = async (m, { conn, usedPrefix }) => {
	let user = await db.users.get(m.sender)
	if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.job == 'hunter') {
	let cap = `*━━━ ❨ Kandang Buruan ❩ ━━┄┈*

=> *Berikut Kandang :*  @${m.sender.split`@`[0]}

🦅 *Elang* : [ ${user.elang} ]
🐻 *Beruang* : [ ${user.beruang} ]
🐅 *Harimau* : [ ${user.harimau} ]
🐊 *Buaya* : [ ${user.buaya} ]
🦆 *Bebek* : [ ${user.bebek} ]
🐓 *Ayam* : [ ${user.ayam} ]
🐨 *Koala* : [ ${user.koala} ]
🦓 *Zebra* : [ ${user.zebra} ]
🐄 *Sapi* : [ ${user.sapi} ]
🐷 *Babi* : [ ${user.babi} ]
🐃 *Banteng* : [ ${user.banteng} ]
🦬 *Kerbau* : [ ${user.kerbau} ]
🐇 *Kelinci* : [ ${user.kelinci} ]
🐿️ *Tupai* : [ ${user.tupai} ]
🐺 *Serigala* : [ ${user.serigala} ]
🐑 *Domba* : [ ${user.domba} ]
🦇 *Kelelawar* : [ ${user.kelelawar} ]
🦔 *Landak* : [ ${user.landak} ]
🦘 *Kangguru* : [ ${user.kangguru} ]
🦡 *Trenggiling* : [ ${user.trenggiling} ]
🦏 *Badak* : [ ${user.badak} ]
🐘 *Gajah* : [ ${user.gajah} ]
	
Gunakan *${usedPrefix}pasarsell* untuk dijual`

	conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) } )
	return
}
await conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai hunter', m);
}

jarspy.help = ['kandang']
jarspy.tags = ['rpg']
jarspy.command = /^(kandang)$/i

export default jarspy