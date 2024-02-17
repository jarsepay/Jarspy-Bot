import fetch from "node-fetch" 
  
let jarspy = async (m, { conn, isOwner, usedPrefix, command, text, args }) => {
 if (!Number(text)) return m.reply(`Masukkan nomornya. Contoh pemakaian: ${usedPrefix + command} 1`)
      try {
        let res = await fetch('https://civitai.com/api/v1/models')
        let jso = await res.json()
        let resu = jso.items[text].modelVersions[0].images[0].meta.prompt
        await m.reply(resu)
        } catch (e) {
   conn.reply(m.chat, e.message, m)
  }
}
jarspy.help = ["modeldif"]
jarspy.tags = ["internet"]
jarspy.command = /^(modeldif)$/i
 
export default jarspy