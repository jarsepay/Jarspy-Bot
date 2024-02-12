/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import TicTacToe from '../lib/tictactoe.js'

let jarspy = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {}
    if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw 'Kamu masih didalam game'
    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
    // m.reply('[WIP Feature]')
    if (room) {
        m.reply('Partner ditemukan')
        room.o = m.chat
        room.game.playerO = m.sender
        room.state = 'PLAYING'
        let arr = room.game.render().map(v => {
            return {
                X: '❌',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v]
        })
        let str = `
◦ Room ID: ${room.id}
${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}
◦ Menunggu @${room.game.currentTurn.split('@')[0]}
◦ Ketik *nyerah* untuk nyerah
`.trim()
        if (room.x !== room.o) await conn.reply(room.x, str, null, {mentions: conn.parseMention(str)})
        //if (room.x !== room.o) await conn.sendButton(room.x, str, author, ['Nyerah', 'nyerah'], m, {mentions: conn.parseMention(str)})
        await conn.reply(room.o, str, null, {mentions: conn.parseMention(str)})
        //await conn.sendButton(room.o, str, author, ['Nyerah', 'nyerah'], m, {mentions: conn.parseMention(str)})
    } else {
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        }
        if (text) room.name = text
        m.reply('Menunggu partner...' + (text ? ` mengetik command dibawah ini
${usedPrefix}${command} ${text}` : ''))
        conn.game[room.id] = room
    }
}

jarspy.help = ['tictactoe']
jarspy.tags = ['game']
jarspy.command = /^(tictactoe|t{3})$/

export default jarspy