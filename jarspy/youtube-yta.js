/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { 
     youtubedl, 
     youtubedlv2 
 } from "@bochilteam/scraper" 
 import fetch from "node-fetch" 
 import ytdl from "ytdl-core" 
  
 let jarspy = async (m, { 
     conn, 
     args 
 }) => { 
     if (!args[0]) throw "Masukkan url dari youtube" 
     await m.react('🕑')
     try { 
  
         let Ytdl = await ytmp3(args[0]) 
         let dls = "Download audio berhasil" 
         let ytthumb = await (await conn.getFile(Ytdl.meta.image)).data 
         let doc = { 
             audio: Ytdl.buffer, 
             mimetype: "audio/mp4", 
             fileName: Ytdl.meta.title, 
             contextInfo: { 
                 externalAdReply: { 
                     showAdAttribution: true, 
                     mediaType: 2, 
                     mediaUrl: args[0], 
                     title: Ytdl.meta.title, 
                     body: dls, 
                     sourceUrl: args[0], 
                     thumbnail: ytthumb 
                 } 
             } 
         } 
  
         await conn.sendMessage(m.chat, doc, { 
             quoted: m 
         }) 
  
     } catch { 
         try { 
  
             let yt = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0])) 
             let link = await yt.audio["128kbps"].download() 
             let ytl = "https://youtube.com/watch?v=" 
             let dls = "Download audio berhasil" 
             let ytthumb = await (await conn.getFile(yt.thumbnail)).data 
             let doc = { 
                 audio: { 
                     url: link 
                 }, 
                 mimetype: "audio/mp4", 
                 fileName: yt.title, 
                 contextInfo: { 
                     externalAdReply: { 
                         showAdAttribution: true, 
                         mediaType: 2, 
                         mediaUrl: ytl + yt.id, 
                         title: yt.title, 
                         body: dls, 
                         sourceUrl: ytl + yt.id, 
                         thumbnail: ytthumb 
                     } 
                 } 
             } 
  
             await conn.sendMessage(m.chat, doc, { 
                 quoted: m 
             }) 
  
         } catch { 
             try { 
  
                 let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkey}&url=${args[0]}`) 
                 let lolh = await lolhuman.json() 
                 let n = lolh.result.title || "Terjadi Kesalahan" 
                 await conn.sendMessage(m.chat, { 
                     audio: { 
                         url: lolh.result.link 
                     }, 
                     fileName: `${n}.mp3`, 
                     mimetype: "audio/mp4" 
                 }, { 
                     quoted: m 
                 }) 
             } catch (e) { 
                 await m.reply("Error: " + e.message)
             } 
         } 
     } 
 } 
 jarspy.help = ["mp3"].map(v => "yt" + v + ``) 
 jarspy.tags = ["youtube"] 
 jarspy.command = /^y((outube|tb)audio|(outube|tb?)mp3|utubaudio|taudio|ta)$/i 
  
 jarspy.exp = 0 
 jarspy.register = false 
 jarspy.limit = 5 
  
 export default jarspy 
  
 async function ytmp3(url) { 
     try { 
         const { 
             videoDetails 
         } = await ytdl.getInfo(url, { 
             lang: "id" 
         }); 
  
         const stream = ytdl(url, { 
             filter: "audioonly", 
             quality: 140 
         }); 
         const chunks = []; 
  
         stream.on("data", (chunk) => { 
             chunks.push(chunk); 
         }); 
  
         await new Promise((resolve, reject) => { 
             stream.on("end", resolve); 
             stream.on("error", reject); 
         }); 
  
         const buffer = Buffer.concat(chunks); 
  
         return { 
             meta: { 
                 title: videoDetails.title, 
                 channel: videoDetails.author.name, 
                 seconds: videoDetails.lengthSeconds, 
                 description: videoDetails.description, 
                 image: videoDetails.thumbnails.slice(-1)[0].url, 
             }, 
             buffer: buffer, 
             size: buffer.length, 
         }; 
     } catch (error) { 
         throw error; 
     } 
 };