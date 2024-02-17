import axios from "axios" 
 const api_Key = "636e1481b4f3c446d26b8eb6ebfe7127"; 
 const URL = "https://farm66.staticflickr.com"; 

let jarspy = async (m, { conn, isOwner, usedPrefix, command, args }) => { 
        let query = `Apa yang ingin kamu cari? Contoh pemakaian: ${usedPrefix + command} kuda`
        let text 
        if (args.length >= 1) { 
                text = args.slice(0).join(" ") 
        } else if (m.quoted && m.quoted.text) { 
                text = m.quoted.text 
        } else throw query 
          
        try { 
        await m.react('🕑')
         var imge = await searchTopic(text) 
         var rand = imge.getRandom() 
         var resul = "https://farm66.staticflickr.com/" + rand.server + "/" + rand.id + "_" + rand.secret + ".jpg" 
         conn.sendFile(m.chat, resul, "result", "Hasil Flickr: " + text.toUpperCase() + "", m) 
   } catch (e) { 
   throw e.message 
  } 
} 
jarspy.help = ["flickr"]
jarspy.tags = ["internet"]
jarspy.command = /^(flickr)$/i
 
jarspy.limit = true

export default jarspy 
  
  
 async function searchTopic(query) { 
   const response = await axios.get( 
       `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_Key}&tags=${query}&per_page=24&format=json&nojsoncallback=1` 
     ) 
     return response.data.photos.photo 
 };