import fetch from 'node-fetch' 
  
let jarspy = async (m, {conn, text, usedPrefix, command }) => { 
     if (!text) throw `Contoh pemakaian: ${usedPrefix}${command} ibrahim` 
     let url = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${text}.json`) 
    let kisah = await url.json().catch(_ => "Error") 
    if (kisah == "*Error*") throw "*Tidak Ditemukan*\n*Coba Jangan Gunakan Huruf Kapital" 
  
    let hasil = `◦ _*Nama Nabi :*_ ${kisah.name}  
◦ _*Tanggal Lahir :*_ ${kisah.thn_kelahiran} 
◦ _*Tempat Lahir :*_ ${kisah.tmp} 
◦ _*Usia :*_ ${kisah.usia} 
  
 * — [ K I S A H ] — * 
  
⋄ ${kisah.description}` 
  
    conn.reply(m.chat, hasil, m)  
} 
jarspy.help = ['kisahnabi'] 
jarspy.tags = ['internet'] 
jarspy.command = /^kisahnabi$/i 
  
export default jarspy