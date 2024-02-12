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
	let cap = `*━━━ ❨ Weapons ❩ ━━┄┈*

@${m.sender.split`@`[0]} *Weapon*

*≡ Old Weapon*
○ *Tombak* : ${user.tombak}
○ *Busur* : ${user.busur}

*≡ Modern Weapon*
○ *Glock* : ${user.glock}
○ *AK-47* : ${user.ak47}
○ *M4* : ${user.m4}
○ *M16* : ${user.m16}
○ *AR15* : ${user.ar15}
○ *Scar* : ${user.scar}
○ *Famas* : ${user.famas}
○ *AUG* : ${user.aug}
○ *UZI* : ${user.uzi}
○ *MP5* : ${user.mp5}
○ *P90* : ${user.p90}
○ *Mac10* : ${user.mac10}
○ *Vector* : ${user.vector}
○ *Barrett M82* : ${user.barrettm82}
○ *Remington 700* : ${user.remington700}
○ *Dragunov SVD* : ${user.dragunovsvd}
○ *M40* : ${user.m40}
○ *M24* : ${user.m24}

*≡ Peluru*
○ *Anak Panah* : ${user.anakpanah}
○ *Ammo* : ${user.ammo}

Gunakan *${usedPrefix}sellgun* untuk menjual weapon`

	conn.reply(m.chat, cap, m, { mentions: await conn.parseMention(cap) } )
	return
}
await conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai hunter', m);
}

jarspy.help = ['weapon']
jarspy.tags = ['rpg']
jarspy.command = /^(weapon)$/i

export default jarspy