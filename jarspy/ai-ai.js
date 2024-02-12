/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from "node-fetch";

const jarspy = async (m, { conn, text }) => {
	if (!text) return conn.reply(m.chat, `Mau nanya apa?`, m)
	try {
    let emsg = await conn.sendMessage(m.chat, {
    text: '```Jarspy is thinking...```' 
  })
	const web = await fetch(`https://aemt.me/gpt4?text=${encodeURIComponent(text)}`)
	const result = await web.json()
	await conn.relayMessage(m.chat, {
             protocolMessage: { 
                 key: emsg.key, 
                 type: 14, 
                 editedMessage: { 
                     conversation: result.result
                 } 
             } 
         }, {})
	} catch (e) {
		conn.reply(m.chat, "Error: " + e.message, m)
	}
}

jarspy.command = jarspy.help = ["ai", "jarspy", "openai", "chatgpt"]
jarspy.tags = ["ai"]

jarspy.limit = 3

export default jarspy