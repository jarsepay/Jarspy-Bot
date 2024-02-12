/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

let jarspy = async (m, { conn, args, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    const buttons = Object.keys(modes).map(v => [v, `${usedPrefix}${command} ${v}`])
    if (args.length < 1) return conn.reply(m.chat, `Mode: ${Object.keys(modes).join(' | ')}
Contoh pemakaian: ${usedPrefix}math medium
  `.trim(), m)
    let mode = args[0].toLowerCase()
    if (!(mode in modes)) return conn.reply(m.chat, `Mode: ${Object.keys(modes).join(' | ')}
Contoh pemakaian: ${usedPrefix}math medium
    `.trim(), m)
    //if (!(mode in modes)) return conn.sendButton(m.chat, `Mode: ${Object.keys(modes).join(' | ')} Contoh penggunaan: ${usedPrefix}math medium   `.trim(), author, null, buttons, m)
    let id = m.chat
    if (id in conn.math) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.math[id][0])
    let math = genMath(mode)
    conn.math[id] = [
        await conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} XP`, m),
        math, 4,
        setTimeout(() => {
            if (conn.math[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${math.result}`, conn.math[id][0])
            //if (conn.math[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah ${math.result}`, author, null, [['again', `${usedPrefix}${command} ${math.mode}`], ...buttons], conn.math[id][0])
            delete conn.math[id]
        }, math.time)
    ]
}
jarspy.help = ['math']
jarspy.tags = ['game']
jarspy.command = /^math/i


let modes = {
    easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
    medium: [-100, 100, -70, 70, '*/+-', 30000, 350],
    hard: [-999999, 999999, -999999, 999999, '*/', 9999, 9999],
    extreme: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
    impossible: [-999999999999999, 999999999999999, -999999999, 999999999, '/*', 1500, 250000],
    end: [-999999999999999, 999999999999999, -999999999999999, 999999999999999, '/*', 500, 1000000],
}

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

jarspy.modes = modes

export default jarspy