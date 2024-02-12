/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let confirmation = {}

async function jarspy(m, { conn, args, usedPrefix, command }) {
    let user = await db.users.get(m.sender)
    let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!who) return m.reply('Tag target atau ketik nomornya')
    if (!(await db.users.get(who))) return m.reply(`Pengguna ${who} tidak ada dalam database`)
    let _user = await db.users.get(who)
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
    if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
      throw `Kamu harus teregistrasi, untuk itu ketik */set*`
      return
    }
    if (user.gender == 'non-binary' || _user.gender == 'non-binary') {
        return m.reply('Tidak bisa mengungkapkan perasaan kepada atau dari *non-binary*')
    }
    if (user.partner != '-') {
        return m.reply('Kamu sudah memiliki pasangan! Tidak bisa melakukan poligami')
    }
    if (user.crush == who) return m.reply(`Kamu sudah mengungkapkan perasaan cinta kepada orang ini`)
    if (user.crush != '-') m.reply(`Mengganti crush secara berulang-ulang tidak baik`)
    if (_user.banned == true) return m.reply(`Kamu tidak bisa mengungkapkan perasaan cinta kepada orang yang terbanned`)
    let confirm = `
Apakah kamu yakin ingin mengungkapkan perasaan cinta kepada *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*?
Timeout *60* detik
Ketik "y" untuk iya ✅ dan "n" ❌ untuk tidak!
`.trim()
    let c = conn.getName(conn.user.jid)
    await conn.reply(m.chat, confirm, null, { mentions: [who] })
    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        timeout: setTimeout(() => (m.reply('Timeout'), delete confirmation[m.sender]), 60 * 1000)
    }
}

jarspy.before = async (m, { conn }) => {
    let txt = `
💐 Kamu telah menerima ungkapan perasaan cinta dari *@${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')}*!

Ketik "/answer @${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')}" atau "/answer ${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')}"
Untuk menjawab pernyataan cintanya! ❤️
`.trim()
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let { timeout, sender, message, to } = confirmation[m.sender]
    if (m.id === message.id) return
    let user = await db.users.get(sender)
    let _user = await db.users.get(to)
    if (/❌|no?/g.test(m.text.toLowerCase())) {
        clearTimeout(timeout)
        delete confirmation[sender]
        user.crush = '-'
        await db.users.update(sender, (user) => {
            user.crush = '-'
        })
        return m.reply('Membatalkan confess')
    }
    if (/✅|y(es)?/g.test(m.text.toLowerCase())) {
        if (_user.partner != '-') {
            clearTimeout(timeout)
            delete confirmation[sender]
            return m.reply('Kamu tidak bisa mengungkapkan perasaan cinta kepada user yang sudah memiliki pasangan')
        }
        await db.users.update(sender, (user) => {
            user.crush = to
        })
        conn.reply(to, txt, m, { mentions: [m.sender] })
        m.reply(`Kamu telah berhasil mengungkapkan perasaan cintamu kepada *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        clearTimeout(timeout)
        delete confirmation[sender]
    }
}

jarspy.help = ['tembak'].map(v => v + '')
jarspy.tags = ['roleplay']
jarspy.command = /^(tembak)$/i

jarspy.disabled = false

export default jarspy

function isNumber(x) {
    return !isNaN(x)
}

function toSimple(number) {
    if (!isNumber(number)) return number
    number = parseInt(number * 1)
    const formatter = Intl.NumberFormat('en', { notation: 'compact' })
    return formatter.format(number)
}