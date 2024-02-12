let jarspy = async (m, { args, conn, command, text, usedPrefix, participants }) => {
    if (!text) throw "Sebutkan siapa yang ingin kamu periksa karakternya"
    const mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
 const userChar = [
      "Sigma",
      "Generous",
      "Grumpy",
      "Overconfident",
      "Obedient",
      "Good",
      "Simp",
      "Kind",
      "Patient",
      "Pervert",
      "Cool",
      "Helpful",
      "Brilliant",
      "Sexy",
      "Hot",
      "Gorgeous",
      "Cute",
    ]
    const userCharacterSeletion =
      userChar[Math.floor(Math.random() * userChar.length)]

    let message = `Karakter dari ${text} adalah *${userCharacterSeletion}* 🔥⚡`
    
    conn.sendMessage(m.chat, { text: message, mentions: [mentionedUser] }, { quoted: m })
    
}
jarspy.help = ["char"]
jarspy.tags = ['fun']
jarspy.command = /^(char)/i

export default jarspy