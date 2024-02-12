let jarspy = async (m, { conn }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (!(id in conn.tebakkata)) throw false
    let json = conn.tebakkata[id][1]
    let ans = json.jawaban.trim()
    let clue = ans.replace(/[AIUEO]/gi, '_')
    m.reply('```' + clue + '```')
}
jarspy.command = /^teka$/i

jarspy.limit = true

export default jarspy