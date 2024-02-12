let jarspy = async (m, { conn }) => {
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    
      conn.reply(m.chat, `⚡ Bot Active for *${uptime}*`, m)
}
jarspy.help = ['runtime']
jarspy.tags = ['info']
jarspy.command = /^(uptime|runtime)$/i

export default jarspy

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}