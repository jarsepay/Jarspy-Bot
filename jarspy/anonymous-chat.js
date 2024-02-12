/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

async function jarspy(m, { command, conn }) {
    let user = await db.users.get(m.sender)
    
    if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
      throw `Kamu harus teregistrasi, untuk itu ketik */set*`
      return
    }
    
    command = command.toLowerCase()
    global.anonymous = global.anonymous ? global.anonymous : {}
    
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(global.anonymous).find(room => room.check(m.sender))
            if (!room) return this.reply(m.chat, '_Kamu tidak sedang berada di anonymous chat_\nKetik /start untuk cari partner', m)
            
            m.reply('*Berhasil leave chat*\nKetik /start untuk cari partner')
            let other = room.other(m.sender)
            if (other) await this.reply(other, '_Partner meninggalkan chat_\nKetik /start untuk cari partner baru')
            
            delete global.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(global.anonymous).find(room => room.check(m.sender))) return this.reply(m.chat, '_Kamu masih berada di dalam anonymous chat, menunggu partner_\nKetik /leave untuk meninggalkan chat', m)
            
            let room = Object.values(global.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.reply(room.a, '_Partner ditemukan_\nKetik /next bila ingin mengganti partner\nKetik /leave untuk meninggalkan chat', m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.reply(room.b, '_Partner ditemukan_\nKetik /next bila ingin mengganti partner\nKetik /leave untuk meninggalkan chat', m)
            } else {
                let id = + new Date
                global.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.reply(m.chat, '_Menunggu partner..._\nKetik /leave untuk meninggalkan room', m)
            }
            break
        }
    }
}

jarspy.help = ['start', 'leave', 'next']
jarspy.tags = ['anonymous']
jarspy.command = ['start', 'leave', 'next']
jarspy.private = true

export default jarspy