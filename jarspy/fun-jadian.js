let toM = a => '@' + a.split('@')[0]
function jarspy(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b
    do b = ps.getRandom()
    while (b === a)
    m.reply(`${toM(a)} ❤️ ${toM(b)}`, null, {
        mentions: [a, b]
    })
}
jarspy.help = ['jadian']
jarspy.tags = ['fun']
jarspy.command = ['jadian']

jarspy.group = true

export default jarspy