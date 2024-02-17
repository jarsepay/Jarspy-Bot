import axios from "axios" 
import fetch from "node-fetch" 
import cheerio from "cheerio" 
import {  JSDOM } from "jsdom" 
  
let jarspy = async (m, { conn, args, usedPrefix, text, command }) => { 
    if (!text) throw `Apa yang ingin kamu cari? Contoh pemakaian: ${usedPrefix + command} kuda`
    try {
           await m.react('🕑')
            let res = await FlatIcon(text) 
            let rdm = res[Math.floor(Math.random() * res.length)]; 
            await conn.sendMessage(m.chat, { 
                image: { url: rdm }}, { quoted: m }) 
      } catch (e) { 
        throw e.message 
    } 
} 
jarspy.help = ["flaticon"] 
jarspy.tags = ["internet"] 
jarspy.command = /^flaticon$/i 

jarspy.limit = true
 
export default jarspy 
  
async function FlatIcon(query) { 
let res = await fetch('https://www.flaticon.com/free-icons/' + query) 
    let html = await res.text() 
    let dom = new JSDOM(html) 
    var collection = dom.window.document.querySelectorAll('.icon--item'); 
    let img = [] 
for (var i = 0; i < collection.length; i++) { 
        img.push(collection[i].getAttribute('data-png')) 
} 
let newArr = img.filter(el => el != null); 
return newArr 
}