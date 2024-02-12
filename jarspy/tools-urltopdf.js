import fetch from "node-fetch" 
  
 let jarspy = async (m, { 
     conn, 
     usedPrefix, 
     args, 
     command 
 }) => { 
     let query = "Masukkan link yang ingin di jadikan pdf" 
     let text 
     if (args.length >= 1) { 
         text = args.slice(0).join(" ") 
     } else if (m.quoted && m.quoted.text) { 
         text = m.quoted.text 
     } else throw query
  
     if (!isValidURL(text)) return m.reply("Link tidak valid! Gunakan url lain seperti telegra.ph") 
     try { 
         let gas = "https://api.html2pdf.app/v1/generate?url=" + text + "&apiKey=DzhGk9fhdPope6j8PmVmbxoNDDiWbsFpdeKZfMMrrxtsl3pXCRbfYOd7N4HovaJ1" 
         await conn.sendFile(m.chat, gas, m.name, text, m) 
     } catch (e) { 
         await m.reply(eror) 
     } 
 } 
 jarspy.tags = ["tools"] 
 jarspy.command = jarspy.help = ["urltopdf"] 
 export default jarspy 
  
 function isValidURL(message) { 
     const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/; 
     return urlPattern.test(message); 
 }