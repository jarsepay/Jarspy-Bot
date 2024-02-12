import fetch from 'node-fetch' 
import request from 'request' 
import  cheerio from 'cheerio' 
  
let jarspy = async (m, { conn, text }) => { 
  if (!text) throw 'Masukkan namanya' 
  let nama = text 
 request.get({ 
         headers: {'content-type' : 'application/x-www-form-urlencoded'}, 
         url:     'http://www.primbon.com/arti_nama.php?nama1='+ nama +'&proses=+Submit%21+', 
       },function(error, response, body){ 
           let $ = cheerio.load(body)
           var y = $.html().split('arti:')[1]
           var t = y.split('method="get">')[1]
           var f = y.replace(t ," ")
           var x = f.replace(/<br\s*[\/]?>/gi, "")
           var h  = x.replace(/<[^>]*>?/gm, '')
       console.log(""+ h)
       conn.reply(m.chat, `Nama: *${nama}*\n\nArti: ${h}`, m)
  })
}
jarspy.help = ['artinama']
jarspy.tags = ['fun']
jarspy.command = ['artinama']

export default jarspy