import fetch from 'node-fetch' 
import { mediafiredl } from '@bochilteam/scraper' 
  
let jarspy = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => { 
         var limit 
      if((isOwner || isPrems)) limit = 1200 
      else limit = 100 
    if (!args[0]) throw `Contoh pemakaian: ${usedPrefix}${command} https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file` 
     if (!args[0].match(/mediafire/gi)) throw `*❌ Link Salah*` 
     m.react('🕑')
     let full = /f$/i.test(command) 
     let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0] 
     let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url: u }))).buffer() 
     let res = await mediafiredl(args[0]) 
     let { url, url2, filename, ext, aploud, filesize, filesizeH } = res 
     let isLimit = (isPrems || isOwner ? limit : limit) * 1012 < filesize 
     let caption = ` 
    ≡ *MEDIAFIRE* 
  
▢ *Nama File:* ${filename} 
▢ *Ukuran:* ${filesizeH} 
▢ *Extension:* ${ext} 
▢ *Diupload:* ${aploud} 
 ${isLimit ? `\n▢ File Melebihi Batas Pengunduhan *+${limit} MB*\nTingkatkan Ke Premium Plan Agar Dapat Mengunduh File Hingga *900 MB* Keatas` : ''}  
 `.trim() 
     await conn.sendFile(m.chat, ss, 'Mediafire Downloader', caption, m) 
  
     if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true }) 
} 
jarspy.help = ['mediafire'] 
jarspy.tags = ['downloader'] 
jarspy.command = ['mediafire', 'mf', 'mfire']
jarspy.limit = 10
  
export default jarspy