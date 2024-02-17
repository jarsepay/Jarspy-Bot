import fetch from "node-fetch" 
  
let jarspy = async (m, { conn, isOwner, usedPrefix, command, args }) => { 
        let query = `Harap masukkan nama urban yang ingin ditelusuri. Contoh pemakaian: ${usedPrefix + command} pocong`
        let text 
        if (args.length >= 1) { 
                text = args.slice(0).join(" ") 
        } else if (m.quoted && m.quoted.text) { 
                text = m.quoted.text 
        } else throw query 
 
        const url = "https://api.urbandictionary.com/v0/define?term=" + text 
        let response 
       try { 
            response = await fetch(url).then(res => res.json()) 
        } 
        catch (e) { 
             throw '*Terjadi kesalahan harap coba lagi!*' 
        } 
  
        const [answer] = response.list 
        if (!answer) throw "Tidak ada hasil yang ditemukan untuk " + text 
        const { list } = response 
        const caption = list.map((v, index) => { return `◦ *Word:* ${v.word}\n◦ *Definition:* ${v.definition}\n◦ *Permanent Link:* ${v.permalink}\n◦ *Author:* ${v.author}\n◦ *Ex:* ${v.example}\n◦ *Written date:* ${v.written_on}` }).join('\n\n\n') 
        await conn.reply(m.chat, caption, m) 
} 
jarspy.help = ["urban"] 
jarspy.tags = ["internet"] 
jarspy.command = /^(urban)$/i
  
export default jarspy