let jarspy = async (m, { conn, command, usedPrefix, text, groupMetadata }) => {   

if (!text) throw `Contoh: 
${usedPrefix + command} Yang lagi makan`

  let toM = a => '@' + a.split('@')[0] 
  let ps = groupMetadata.participants.map(v => v.id) 
   let a = ps.getRandom()
   conn.reply(m.chat, `Yang *${text}* adalah ${toM(a)}`, null, {
      mentions: [a]
  })
}

jarspy.help = ['yang']
jarspy.command = ['yang']
jarspy.tags = ['fun']

jarspy.group = true 

export default jarspy