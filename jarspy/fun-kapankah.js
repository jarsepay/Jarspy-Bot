let jarspy = async (m, { conn, command, text }) => conn.reply(m.chat, `
◦ *Pertanyaan:* ${command} ${text}
◦ *Jawaban:* ${(10).getRandom()} ${['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun', 'dekade', 'abad'].getRandom()} lagi ...
  `.trim(), m, m.mentionedJid ? {
    mentions: m.mentionedJid
} : {})

jarspy.help = ['', 'kah'].map(v => 'kapan' + v + '')
jarspy.tags = ['fun']
// jarspy.customPrefix = /(\?$)/
jarspy.command = /^kapan(kah)?$/i

export default jarspy