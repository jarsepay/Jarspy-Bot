/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

let jarspy = async (m, { conn, text }) => {
  let args = text.split('\n').map(arg => arg.trim())
  let name = args[0]
  let values = args.slice(1)

  if (!name) {
    throw `*Contoh pemakaian:*
.poll text
text1
text2
seterusnya...

⌕ Contoh:
.poll best game
free fire
mobile legends
call of duty mobile
pubg mobile`.trim()
 return
  }

  if (values.length < 2) {
    throw `*Berikan minimal 2 kata yang ingin dipoll*\n\n⌕ Contoh:\n.poll mending mana\npaolo maldini\nsergio ramos`
    return
  }

  let poll = {
    name: name,
    values: values,
    selectableCount: true
  }

  conn.sendMessage(m.chat, {
    poll: poll
  })

}
jarspy.help = ['poll']
jarspy.tags = ['group']
jarspy.command = /^(poll|polling)$/i
jarspy.group = true

export default jarspy