function jarspy(m, { text }) {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    m.reply(teks.replace(/[aiueo]/gi, '$&ve'))
}
jarspy.help = ['purba']
jarspy.tags = ['fun']
jarspy.command =  /^(purba)$/i

export default jarspy