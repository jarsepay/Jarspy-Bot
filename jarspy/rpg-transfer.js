/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

const cooldown = 30000
const items = [
    'money', 'limit', 'potion', 'medkit',
    'uncommon', 'common', 'rare', 'mythical', 'legendary', 'ancient',
    'kentang', 'burger', 'pizza', 
]

let confirmation = {}

async function jarspy(m, { conn, args, usedPrefix, command }) {
    if (confirmation[m.sender]) return m.reply('Kamu sedang melakukan transfer')
    
    let user = await db.users.get(m.sender)
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
    await db.users.update(m.sender, (user) => {
            user.statustransfer = false
        })
    
    if (new Date() - user.lasttransfer < cooldown) {
        const remainingTime = ((user.lasttransfer + cooldown) - new Date()).toTimeString()
        throw `Kamu baru saja transfer, tunggu selama *${remainingTime}*`
    }
    
    const item = items.filter(v => v in user && typeof user[v] == 'number')
    let lol = `
Contoh pemakaian: ${usedPrefix}${command} money 9999 @${global.nomorowner}

⬡ Barang yang dapat ditransfer
${item.map(v => `${global.rpg.emoticon(v)}${v}`.trim()).join('\n')}
`.trim()

    const type = (args[0] || '').toLowerCase()
    if (!(item.includes(type))) return m.reply(lol)

    if (!args[1]) {
        m.reply(lol)
        return
    }    
    
    const count = Math.min(Math.max(1, (isNumber(args[1]) ? parseInt(args[1].replace(/[^\d.-]/g, "")) : (args[1].toUpperCase().replace(/[^\d.]/g, "") * ({"K":1000,"M":1e6,"B":1e9,"T":1e12,"QA":1e15,"QI":1e18,"SX":1e21,"SP":1e24,"OC":1e27,"N":1e30,"DC":1e33,"UD":1e36,"DD":1e39,"TD":1e42,"QUA":1e45,"QUI":1e48, "SXD":1e51, "SPD":1e54, "OCD":1e57, "NOD":1e60, "VG":1e63}[args[1].toUpperCase().replace(/\d/g, '')] || 1)))));
    
    let who = (m.mentionedJid && m.mentionedJid[2]) ? m.mentionedJid[2] : (args[2] && !args[3]) ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : (args[2] && args[3] && !args[4]) ? (args[2].replace(/[@ .+-]/g, '') + args[3].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : (args[2] && args.slice(3).join('').trim()) ? (args[2].replace(/[@ .+-]/g, '') + '@' + args.slice(3).join('').trim() + '.whatsapp.net') : '';
    
    if (!who) return m.reply('Tag target atau ketik nomornya')
    const targetUser = await db.users.get(who)
    
    if (!targetUser) return m.reply(`Pengguna ${who} tidak ada dalam database`)
    if (targetUser.banned) return m.reply(`Kamu tidak bisa mengirim ke orang yang terbanned!`)
    //if (count > 100000) return m.reply(`Maksimal mengirim 100k suatu item`)
    if (!user.settransfer) return m.reply(`Kamu telah menonaktifkan transfer`)
    if (!targetUser.settransfer) return m.reply(`Dia telah menonaktifkan transfer`)
    if (targetUser.level < 2 || user.level < 2) return m.reply (`Minimal level kamu atau target adalah 2`)
    if (user[type] * 1 < count) return m.reply(`Jumlah *${rpg.emoticon(type)}${type}${special(type)}* kamu tidak mencukupi *${toSimple(count - user[type])}*`)
    
    let confirm = `
Apakah kamu yakin ingin mentransfer *${toSimple(count)}* ${rpg.emoticon(type)}${type}${special(type)} ke *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*
Waktu habis *60* detik
Ketik "y" untuk ya ✅ dan "n" ❌ untuk tidak!
`.trim()

    conn.reply(m.chat, confirm, null, { mentions: [who] })
    
    await db.users.update(m.sender, (user) => {
            user.statustransfer = true
        })
    
    //conn.sendButton(m.chat, confirm, c, null, [['✅'], ['❌']], m, { mentions: [who] })
    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        type,
        count,
        timeout: setTimeout(() => (m.reply('Waktu habis'), delete confirmation[m.sender]), 60 * 1000)
    }
}

jarspy.before = async m => {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let { timeout, sender, message, to, type, count } = confirmation[m.sender]
    if (m.id === message.id) return
    let user = await db.users.get(sender)
    let targetUser = await db.users.get(to)
    
    if ((/❌|no?/g.test(m.text.toLowerCase()))) {
        await db.users.update(sender, (user) => {
            clearTimeout(timeout)
            delete confirmation[sender]
        })
        await db.users.update(sender, (user) => {
            user.statustransfer = false
        })
        return m.reply('❌ Membatalkan transfer')
    }
    if ((/✅|y(es)?/g.test(m.text.toLowerCase())) && (+new Date() > user.lastcommand) && (user.statustransfer == true)) {        
        await db.users.update(sender, (user) => {
            user.statustransfer = false
        })
        
        let previous = user[type] * 1
        let _previous = targetUser[type] * 1
        await db.users.update(sender, (user) => {
            user[type] -= count * 1
            user.lasttransfer = new Date() * 1
        })
        await db.users.update(to, (targetUser) => {
            targetUser[type] += count * 1
        })
        
        const updatedUser = await db.users.get(sender)
        const updatedTargetUser = await db.users.get(to)
                
        if (previous > updatedUser[type] * 1 && _previous < updatedTargetUser[type] * 1) {
            m.reply(`Berhasil mentransfer *${toSimple(count)}* ${rpg.emoticon(type)}${type}${special(type)} ke *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        } else {
            await db.users.update(sender, (user) => {
                user[type] = previous
            })
            await db.users.update(to, (targetUser) => {
                targetUser[type] = _previous
            })
            m.reply(`Gagal mentransfer *${toSimple(count)}* ${rpg.emoticon(type)}${type}${special(type)} ke *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        }
        await db.users.update(sender, (user) => {
            clearTimeout(timeout)
            delete confirmation[sender]
        })
    }
}

jarspy.help = ['transfer']
jarspy.tags = ['rpg']
jarspy.command = /^(transfer|tf)$/i
jarspy.cooldown = cooldown

jarspy.disabled = false

export default jarspy

function special(type) {
    let b = type.toLowerCase()
    let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
    return special
}

function isNumber(x) {
    return !isNaN(x)
}

function toSimple(number) {
  if (isNaN(parseFloat(number))) return number;
  if (parseFloat(number) === 0) return '0';
  number = parseFloat(number).toFixed(0);
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg'];
  const base = 1000;
  const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[exponent] || '';
  const simplified = number / Math.pow(base, exponent);
  const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
  return formatter.format(simplified) + suffix;
}