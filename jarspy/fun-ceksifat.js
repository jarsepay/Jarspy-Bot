import fetch from 'node-fetch'; 
  
let jarspy = async (m, { conn, command, text }) => { 
   let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender; 
   let pp = await conn.profilePictureUrl(who).catch(_ => thumb.getRandom()); 
   let name = await conn.getName(who); 
  
   if (!text) return conn.reply(m.chat, '*Masukan Namamu!*', m); 
  
    const attributes = ['Baik Hati', 'Sombong', 'Pelit', 'Dermawan', 'Rendah Hati', 'Rendah Diri', 'Pemalu', 'Penakut', 'Pengusil', 'Cengeng']; 
    const behaviors = ['Rajin', 'Malas', 'Membantu', 'Ngegosip', 'Jail', 'Gak jelas', 'Shoping', 'Chattan sama Doi', 'Chattan di WA karna Jomblo', 'Sedih', 'Kesepian', 'Bahagia']; 
  
    const getRandomValue = () => Math.floor(Math.random() * 100) + 1; 
    const getRandomElement = array => array[Math.floor(Math.random() * array.length)]; 
  
    let nm = getRandomValue(); 
    let [a, b, e, f, g, h] = Array.from({ 
        length: 6 
    }, getRandomValue); 
    let c = getRandomElement(attributes); 
    let d = getRandomElement(behaviors); 
  
    let cksft = `*⬡ Nama:* ${text} 
*⬡ Ahlak Baik:* ${a}% 
*⬡ Ahlak Buruk:* ${b}% 
*⬡ Orang yang:* ${c} 
*⬡ Selalu:* ${d} 
*⬡ Kecerdasan:* ${e}% 
*⬡ Kenakalan:* ${f}% 
*⬡ Keberanian:* ${g}% 
*⬡ Ketakutan:* ${h}% 
   `; 
  
    const msdpn = [text + ' akan menjadi orang yang kaya, keluarga yang harmonis, memiliki ' + b + ' memiliki anak, memiliki ' + d + ' memiliki kendaraan, memiliki ' + b + ' rumah', text + ' akan menjadi orang yang sederhana, keluarga yang harmonis, memiliki ' + c + ' memiliki anak, memiliki ' + a + ' memiliki kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang miskin, keluarga yang sederhana, memiliki ' + a + ' anak, tidak memiliki kendaraan, rumah ngontrak', text + ' akan menjadi orang yang sederhana, keluarga yang dicerai, memiliki ' + e + ' anak, memiliki ' + b + ' kendaraan, memiliki ' + b + ' rumah', text + ' akan menjadi orang yang sederhana, keluarga yang sederhana, memiliki ' + b + ' anak, memiliki ' + b + ' kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang miskin, keluarga yang dicerai memiliki ' + b + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang kaya, keluarga yang sederhana, memiliki ' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + b + ' rumah', text + ' akan menjadi orang yang sederhana, keluarga yang harmonis, memiliki ' + a + ' anak, memiliki ' + c + ' kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang miskin, tidak memiliki keluarga (jomblo), tidak memiliki anak, tidak memiliki kendaraan, tidak memiliki rumah', text + ' akan menjadi orang yang sederhana, keluarga yang sederhana, memiliki ' + d + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + b + ' rumah', text + ' akan menjadi orang yang sederhana, keluarga yang kacau, tidak memiliki anak (Gugur), memiliki ' + b + ' kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang sangat kaya, keluarga yang sangat harmonis, memiliki ' + e + ' anak, memiliki ' + f + ' kendaraan, memiliki ' + g + ' rumah', text + ' akan menjadi orang yang Sangat miskin, keluarga yang sederhana, memiliki ' + g + ' anak, tidak memiliki kendaraan, rumah ngontrak', text + ' akan menjadi orang yang kaya, keluarga yang pelit, memiliki ' + b + ' anak, memiliki ' + b + ' kendaraan, memiliki ' + b + ' rumah', text + ' akan menjadi orang yang Sederhana, keluarga yang Pelit, memiliki ' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang sederhana, keluarga yang dicerai, memiliki ' + b + ' anak, memiliki ' + a + ' kendaraan, rumah ngontrak', text + ' akan menjadi orang yang sangat sederhana, keluarga yang sakinah, memiliki ' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang sederhana, keluarga yang sangat sederhana, memiliki ' + a + '' + a + ' anak, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah', text + ' akan menjadi orang yang sederhana, keluarga yang sangat sederhana, memiliki ' + b + ' anak kembar, memiliki ' + c + ' kendaraan, memiliki ' + b + ' rumah', text + ' akan menjadi orang yang sederhana keluarga yang sederhana, memiliki ' + b + ' anak kembar dan ' + a + ' anak lagi, memiliki ' + a + ' kendaraan, memiliki ' + a + ' rumah'][getRandomValue() % 20]; 
  
    if (command == 'ceksifat') { 
        await conn.reply(m.chat, cksft, m)
    } 
  
    if (command == 'masadepan') { 
        await conn.reply(m.chat, msdpn, m)
    } 
}; 
  
jarspy.help = ['ceksifat', 'masadepan']; 
jarspy.tags = ['fun']; 
jarspy.command = ['ceksifat', 'masadepan']; 
  
export default jarspy;