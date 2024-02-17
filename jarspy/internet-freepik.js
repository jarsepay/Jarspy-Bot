import axios from "axios" 
import fetch from "node-fetch" 
import cheerio from "cheerio" 
import { JSDOM } from "jsdom" 
  
let jarspy = async (m, { conn, args, usedPrefix, text, command }) => { 
    if (!text) throw `Apa yang ingin kamu cari? Contoh pemakaian: ${usedPrefix + command} kuda`
    try { 
            await m.react('🕑')
            let res = await FreePik(text) 
            let rdm = res[Math.floor(Math.random() * res.length)]; 
            await conn.sendMessage(m.chat, {  image: { url: rdm }, caption: "Hasil Freepik: " + text.toUpperCase() + "" }, { quoted: m }) 
  
    } catch (e) { 
        throw e.message 
    } 
} 
jarspy.help = ["freepik"] 
jarspy.tags = ["internet"] 
jarspy.command = /^freepik$/i 

jarspy.limit = true

export default jarspy 
  
async function FreePik(query) { 
let res = await fetch('https://www.freepik.com/search?format=search&query=' +query+ '&type=psd') 
    let html = await res.text() 
    let dom = new JSDOM(html) 
    var collection = dom.window.document.getElementsByTagName('img'); 
    let img = [] 
for (var i = 0; i < collection.length; i++) { 
        if (collection[i].getAttribute('src').startsWith('https://img.freepik.com')) { 
        img.push(collection[i].getAttribute('src')) 
        } 
} 
let newArr = img.filter(el => el != null); 
return newArr 
}