import fetch from 'node-fetch'; 
import sharp from 'sharp'; 
  
const jarspy = async (m, { conn }) => {
   try { 
     const response = await fetch('https://randomuser.me/api/')
     const data = await response.json()
  
     const user = data.results[0]; 
     const { 
       name: { title, first, last }, 
       location: { 
         street: { number, name }, 
         city, 
         state, 
         country, 
         postcode, 
         coordinates: { latitude, longitude }, 
         timezone: { offset, description } 
       }, 
       email, 
       login: { uuid, username, password, salt, md5, sha1, sha256 }, 
       dob: { date, age }, 
       registered: { date: registeredDate, age: registeredAge }, 
       phone, 
       cell, 
       id: { name: idName, value: idValue }, 
       picture: { large }, 
       nat 
     } = user
  
     const full_name = `▢ ${first} ${last}`
  
     const userInfo = `◦ Judul: ${title}\n◦ Nama Depan: ${first}\n◦ Nama Belakang: ${last}\n◦ Nama Lengkap: ${full_name}\n\n` + 
       `◦ Lokasi:\n◦ Nomor Jalan: ${number}\n◦ Nama Jalan: ${name}\n◦ Kota: ${city}\n◦ Negara: ${state}\n◦ Country: ${country}\n◦ Kode Pos: ${postcode}\n◦ Garis Lintang: ${latitude}\n◦ Garis Bujur: ${longitude}\n◦ Offset Zona Waktu: ${offset}\n◦ Deskripsi Zona Waktu: ${description}\n\n` + 
       `◦ Email: ${email}\n\n` + 
       `◦ Informasi Login:\n◦ UUID: ${uuid}\n◦ Username: ${username}\n◦ Password: ${password}\n◦ Salt: ${salt}\n◦ MD5 Hash: ${md5}\n◦ SHA1 Hash: ${sha1}\n◦ SHA256 Hash: ${sha256}\n\n` + 
       `◦ Tanggal Lahir: ${date}\n◦ Usia: ${age}\n\n` + 
       `◦ Informasi Pendaftaran:\n◦ Tanggal Terdaftar: ${registeredDate}\n◦ Usia Terdaftar: ${registeredAge}\n\n` + 
       `◦ Nomor Telepon: ${phone}\n◦ Nomor Handphone: ${cell}\n\n` + 
       `◦ Nama ID: ${idName}\n◦ Nilai ID: ${idValue}\n\n` + 
       `◦ Gambar: ${large}\n\n` + 
       `◦ Kebangsaan: ${nat}`
  
     const imageBuffer = await (await fetch(large)).buffer(); 
     const resizedImageBuffer = await sharp(imageBuffer).resize(1000).jpeg().toBuffer()
  
     conn.sendFile(m.chat, resizedImageBuffer, 'randomuser.jpg', `⌕ Berikut informasi pengguna acak:\n\n${userInfo}`, m)
   } catch (error) { 
     conn.reply(m.chat, error.message, m)
     console.error(error)
   } 
}
jarspy.command = jarspy.help = ['randomuser']
jarspy.tags = ['internet'] 
  
export default jarspy