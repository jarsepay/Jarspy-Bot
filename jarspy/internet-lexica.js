import fetch from 'node-fetch'

let jarspy = async (m, { text, command, usedPrefix, conn }) => { 
  
var salah_input = "Contoh pemakaian: " + usedPrefix + command + " cyberpunk" 
if (!text) throw salah_input 
 try { 
     let res = await(await fetch('https://lexica.art/api/v1/search?q=' + text)).json() 
     let randm = res.images 
     let resul = randm.getRandom() 
      
    await conn.sendFile(m.chat, resul.src, text, "Hasil:\n" + resul.prompt, m) 
    } catch (e) { 
    throw eror 
    } 
} 
jarspy.help = ["lexica"]
jarspy.tags = ['internet']
jarspy.command = ["lexica"]
  
export default jarspy