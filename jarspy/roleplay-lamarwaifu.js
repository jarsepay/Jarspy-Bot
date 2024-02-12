/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import { getUserCache } from './_cache.js';

let jarspy = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  const user = await db.users.get(m.sender)
  const jids = await db.users.keys()
  let users = getUserCache();
  
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
  if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
       throw `Kamu harus teregistrasi, untuk itu ketik */set*`
       return
     }
  
   if (user.umur == '6' || user.umur == '7' || user.umur == '8' || user.umur == '9' || user.umur == '10' || user.umur == '11' || user.umur == '12' || user.umur == '13' || user.umur == '14' || user.umur == '15' || user.umur == '16') {
     throw `Kamu tidak bisa memilih waifu karena umurmu masih 16 tahun kebawah. Minimal 17 tahun agar bisa melamar waifu.`
     return
   }
  
   if (user.gender == 'female ♀️') {
     throw `Tidak bisa melamar waifu karena kamu berjenis kelamin perempuan!`
     return
   }
  
   if (user.level < 10) {
     throw `Kamu harus minimal level 10 agar bisa melamar waifu.`
     return
   }

   let isNameExist = users.filter(user => user.waifu.toLowerCase() === text.toLowerCase()).length > 0;

   if (isNameExist) {
     throw 'Waifu tersebut sudah diambil orang lain! Lamarlah waifu yang lain...'
     return
   }

   if (!text || !['miyako shikimori', 'cecilia', 'runa sasaki', 'akane kinoshita', 'shiori katase', 'kana arima', 'akane kurokawa', 'ai hoshino', 'ruby hoshino', 'yukino yukinoshita', 'yui yuigahama', 'shizuka hiratsuka', 'iroha isshiki', 'ayase ayatsuji', 'touka toudou', 'shizuku kurogane', 'stella vermillion', 'aki adagaki', 'izumi sagiri', 'nanako kogure', 'rikka takanashi', 'sanae dekomori', 'shinka nibutani', 'satone shichimiya', 'megumin', 'shinju inui', 'inui sajuna', 'marin kitagawa', 'chizuru tachibana', 'shoko makinohara', 'nodoka toyohama', 'kaede azusagawa', 'rio futaba', 'tomoe koga', 'mai sakurajima', 'shinozaki rika', 'shino asada', 'suguha kirigaya', 'ayano keiko', 'tsukuyo', 'sarutobi ayame', 'shimura tae', 'kyouko hori', 'kagura yato', 'ume kurumizawa', 'nobara kugisaki', 'yor forger', 'kaori miyazono', 'shinobu oshino', 'kanna kamui', 'nagisa kubo', 'makima', 'nero', 'yorha 2b', 'roxy migurdia', 'mitama chan', 'yotsuya miko', 'shinomiya kaguya', 'fujiwara chika', 'hayasaka ai', 'shirogane kei', 'ganyu', 'sangonomiya kokomi', 'eula', 'nilou', 'nahida', 'yae miko', 'kujou sara', 'kamisato ayaka', 'hutao', 'raiden shogun', 'asuna yuuki', 'nakano itsuki', 'nakano nino', 'nakano yotsuba', 'nakano ichika', 'nakano miku', 'ichinose chizuru', 'ruka sarashina', 'mami nanami', 'sumi sakurasawa', 'elaina', 'zero two', 'rimuru tempest', 'milim nava', 'shuna', 'shizue izawa', 'tokisaki kurumi', 'mio takamiya', 'tohka yatogami', 'itsuka kotori', 'yoshino himekawa', 'tobiichi origami', 'miku izayoi', 'mana takamiya', 'chitoge kirisaki', 'kosaki onodera'].includes(text.toLowerCase())) {
     let message = `Contoh pemakaian: ${usedPrefix}${command} nakano miku

➥ Daftar waifu dapat dilihat melalui */waifulist*

✎ Sedikit Penjelasan:
*Waifu* adalah istilah yang berasal dari budaya otaku dan anime, terutama populer di kalangan penggemar anime dan manga. Istilah ini merupakan transliterasi dari kata dalam bahasa Inggris "wife" (istri), tetapi digunakan dalam konteks yang berbeda. 

*Waifu* mengacu pada karakter perempuan dalam anime, manga, permainan video, atau media populer lainnya yang menjadi favorit seseorang.

Penting untuk diingat bahwa istilah "waifu" lebih merupakan ekspresi budaya dan biasanya tidak memiliki implikasi romantis dalam kehidupan nyata. Orang yang menggunakan istilah ini biasanya hanya mengungkapkan rasa kagum mereka terhadap karakter tersebut.
`.trim()
       conn.reply(m.chat, message, m)
     return
   }
   let waifu = `${text}`
   let kapital = capitalizeFirstLetter(waifu)

   let katanya = `${['Terima kasih, kamu telah membuatku merasa istimewa. Saya akan sangat senang untuk menjadi bagian dari hidupmu.', 'Ini adalah momen yang saya tunggu-tunggu. Saya menerimamu dengan hati terbuka.', 'Kamu adalah impian yang menjadi kenyataan dalam hidup saya. Saya bersedia menjadi milikmu selamanya.', 'Ketika kamu berlutut di hadapan saya, kamu juga merobek hati saya. Ya, saya mau.', 'Bersama-sama, kita akan menjalani petualangan yang indah. Saya menerima lamaranmu dengan sukacita.', 'Ini adalah jawaban dari hatiku yang paling dalam. Saya mencintaimu, dan saya akan menjadi milikmu.', 'Saya yakin bahwa kita adalah pasangan yang cocok. Saya menerimamu dengan cinta sejati.', 'Saya tak sabar untuk memulai babak baru dalam hidup bersamamu. Terima kasih telah menjadi bagian penting dalam cerita hidup saya.', 'Dalam dirimu, saya menemukan kebahagiaan sejati. Saya mau, dengan segenap hati.', 'Penerimaan ini adalah awal dari perjalanan kami bersama. Mari kita ciptakan kenangan yang tak terlupakan bersama-sama.'].getRandom()}`
  
   setTimeout(() => {
   conn.reply(m.chat, `Kamu telah melamar ${kapital} untuk menjadi waifumu, tunggulah balasan darinya...`, m)}, 0)
  
   setTimeout(() => {
   conn.reply(m.chat, `Kamu mendapat balasan!
💭 ${kapital} mengatakan....
_"${katanya}"_`, m)}, 60000)
  setTimeout(() => {
  conn.reply(m.chat, `🥳 Lamaran kamu telah diterima oleh *${kapital}*, dan sekarang kalian memiliki status hubungan
  
Ketik */waifuku* untuk melihat detail waifu.`.trim(), m)}, 63000)

    setTimeout(() => {
    db.users.update(m.sender, (user) => {
     user.waifu = text.toLowerCase()
   })
   }, 63000)
   if (user.kepercayaanwaifu > 10) {
     db.users.update(m.sender, (user) => {
     user.kepercayaanwaifu = 10
   })
  } else if (user.kepercayaanwaifu < 10) {
     db.users.update(m.sender, (user) => {
     user.kepercayaanwaifu = 10
   })
   }
}
jarspy.help = ['lamarwaifu']
jarspy.tags = ['roleplay']
jarspy.command = /^lamarwaifu$/i

export default jarspy

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");
  
  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}