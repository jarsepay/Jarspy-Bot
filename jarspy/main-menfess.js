let jarspy = async (m, { conn, text, usedPrefix, command }) => { 
     conn.confess = conn.confess ? conn.confess : {} 
     if (!text) throw `Cara penggunaan :\n${usedPrefix + command} nomor|nama pengirim|pesan\n\nContoh pemakaian:\n${usedPrefix + command} ${m.sender.split`@`[0]}|Nama|Halo.\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n© ${namabot}`; 
     let [jid, name, pesan] = text.split("|") 
     if ((!jid || !name || !pesan)) throw `Cara penggunaan :\n${usedPrefix + command} nomor|nama pengirim|pesan\n\nContoh pemakaian:\n${usedPrefix + command} ${m.sender.split`@`[0]}|Bapakmu|Halo.\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n© ${namabot}`; 
     jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'; 
     let data = (await conn.onWhatsApp(jid))[0] || {}; 
     if (!data.exists) throw 'Nomor tidak terdaftar di Whatsapp. Gunakan nomor yang berawalan 628xxxxx'; 
     if (jid == m.sender) throw 'Tidak dapat mengirim pesan confess ke diri sendiri.' 
     let mf = Object.values(conn.confess).find(mf => mf.status === true) 
     if (mf) return !0 
     try { 
             let id = + new Date 
         let txt = `👋 Hai, kamu menerima pesan confess nih.\n\n▢ Dari: *${name}*\n▢ Pesan: \n◦ ${pesan}\n\n◦ Mau balas pesan ini? bisa kak. Tinggal ketik pesannya nanti saya sampaikan ke *${name}*.`.trim(); 
         await conn.reply(data.jid, txt, null) 
         .then(() => { 
             m.reply('Berhasil mengirim pesan confess.') 
             conn.confess[id] = { 
                 id, 
                 dari: m.sender, 
                 nama: name, 
                 penerima: data.jid, 
                 pesan: pesan, 
                 status: false 
             } 
             return !0 
         }) 
     } catch (e) { 
         console.log(e) 
         m.reply('Terjadi Kesalahan'); 
     } 
}
jarspy.help = ['confess']
jarspy.tags = ['main'] 
jarspy.command = /^(confess|confes|menfess|menfes)$/i 
jarspy.private = true 
  
export default jarspy