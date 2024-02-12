/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';
import { getUserCache } from './_cache.js';

let jarspy = async (m, { isPrems, args, text, conn, usedPrefix, command }) => {
	let user = await db.users.get(m.sender);
    const jids = await db.users.keys()
    let users = getUserCache();
    
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    
    if (!text)
	return conn.sendMessage(m.chat, {
	text: `Set Profilemu:
		
1. Nama
2. Umur
3. Gender
4. Matauang

_"Bagaimana cara penggunaannya?"_ contoh ketika menyetel nama: ${usedPrefix}set nama ${namaowner} dan seterusnya.`,
		contextInfo: {
			externalAdReply: {
				showAdAttribution: true,
				title: wmtitle,
				body: wmbody,
				thumbnailUrl: thumbs,
				mediaType: 1,
				sourceUrl: sid,
				renderLargerThumbnail: true
			}
		}
	}, { quoted: m })

	if (args[0]?.toLowerCase() === "nama") { 
  if (!/^[a-zA-Z\s]+$/.test(args[1])) {
    m.reply('Mohon masukkan nama yang valid.');
    return;
  }

  if (!args[1] || args[1].length < 3 || args[1].length > 40) {
    m.reply('Mohon masukkan nama yang kamu inginkan dengan benar! Maksimal 40 karakter');
    return;
  }

  let isNameExist = users.filter(user => user.nama.toLowerCase() === args[1].toLowerCase()).length > 0;

  if (isNameExist) {
    m.reply('Nama pengguna tersebut sudah digunakan oleh pengguna lain, harap pilih nama lain.');
    return;
  }

  // Set nama pengguna
  await db.users.update(m.sender, (userData) => {
    userData.nama = args[1].trim();
  });

  conn.reply(m.chat, `Nama berhasil diubah menjadi *${args[1].trim()}*.`, m);
	} else if (args[0]?.toLowerCase() === "umur") {
  if (!args[1]) {
    m.reply('*Mohon masukkan umur anda.*')
    return
  }

  // Cek apakah pengguna sudah menentukan umur sebelumnya
  if (user.umur != '-' && isPrems == false) {
    m.reply('*Umur hanya bisa diatur satu kali saja.*')
    return
  }

  // Memeriksa apakah input hanya berupa angka
  if (isNaN(args[1])) {
    m.reply('*Mohon masukkan umur dalam bentuk angka.*')
    return
  }

  // Memeriksa apakah umur kurang dari 8
  if (parseInt(args[1]) < 8) {
    m.reply('*Kamu terlalu muda untuk menggunakan bot ini.*')
    return
  }

  // Memeriksa apakah umur lebih dari 80
  if (parseInt(args[1]) > 80) {
    m.reply('*Kamu terlalu tua untuk menggunakan bot ini.*')
    return
  }

  // Set umur pengguna
  await db.users.update(m.sender, (userData) => {
    userData.umur = args[1].trim()
  })
  conn.reply(m.chat, `Umur berhasil diatur menjadi *${args[1].trim()}* tahun.`, m)
  } else if (args[0]?.toLowerCase() === "gender") {
  if (!args[1] || !['male', 'female'].includes(args[1].toLowerCase())) {
    throw `
Silakan pilih gender anda:
- *Male*  ♂️
- *Female*  ♀️
Contoh: *${usedPrefix}${command} male*
`.trim()
    return
  }

  // Set gender pengguna
  await db.users.update(m.sender, (user) => {
    user.gender = args[1].toLowerCase() === 'male' ? "male ♂️" : "female ♀️"
  })
  
  let gender = `${args[1]}`
  let kapital = capitalizeFirstLetter(gender)
  conn.reply(m.chat, `Jenis kelamin berhasil diatur sebagai *${kapital}*.`, m)
  } else if (args[0]?.toLowerCase() === "matauang") {
  if (user.nama == '-'  || user.gender == 'non-binary' || user.umur == '-') {
      throw `Kamu harus teregistrasi, untuk itu ketik */set*`
      return
    }
  
  if (!args[1] || !['dolar', 'euro', 'yen', 'pound', 'rupee', 'yuan', 'won', 'rubel', 'peso', 'real', 'rupiah'].includes(args[1].toLowerCase())) {
    throw `
Silakan pilih mata uang anda:
- Dolar
- Euro
- Yen
- Pound
- Rupee
- Yuan
- Won
- Rubel
- Peso
- Real
- Rupiah
Contoh pemakaian: *${usedPrefix}${command} Rupiah*
`.trim()
    return
  }
  
  let matamonay = `${args[1]}`
  let kapital = capitalizeFirstLetter(matamonay)
  conn.reply(m.chat, `Mata uang telah diatur menjadi ${kapital}`, m)

     db.users.update(m.sender, (user) => {
     user.matauang = args[1].toLowerCase()
   })
  }
};
jarspy.help = ["set"];
jarspy.tags = ["roleplay"];
jarspy.command = /^(set)$/i;

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