let jarspy = async (m, { conn, command, text }) => m.reply(`
◦ *Pertanyaan:* ${command} ${text}
◦ *Jawaban:* ${['Ya', 'Mungkin Saja', 'Mungkin', 'Mungkin Tidak', 'Tidak', 'Tidak Mungkin'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

jarspy.help = ['apakah']
jarspy.tags = ['fun']
// jarspy.customPrefix = /(\?$)/
jarspy.command = /^apakah$/i

export default jarspy