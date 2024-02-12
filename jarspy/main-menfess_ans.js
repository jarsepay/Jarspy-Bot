const delay = time => new Promise(res => setTimeout(res, time)) 
 let jarspy = m => m 
 jarspy.all = async function (m) { 
         if (!m.chat.endsWith('@s.whatsapp.net')) return !0; 
         this.confess = this.confess ? this.confess : {} 
         let mf = Object.values(this.confess).find(v => v.status === false && v.penerima == m.sender) 
         if (!mf) return !0 
         console.log({ text: m.text }) 
         if (mf && (m.text === 'balas' || m.text === 'Balas' || m.text === '') && m.quoted?.mtype == 'extendedTextMessage') return m.reply("Silahkan kirim pesan balasan kamu.") 
  
         let txt = `👋 Hai, kamu menerima balasan nih.\n\n▢ Pesan yang kamu kirim sebelumnya:\n${mf.pesan}\n\n▢ Pesan balasannya:\n${m.text}\n\n◦ Ingin membalas pesan ini? Ulangi perintah .confess tadi`.trim(); 
         await this.reply(mf.dari, txt, null).then(() => { 
                 m.reply('Berhasil mengirim balasan.') 
                 delay(2000) 
                 delete this.confess[mf.id] 
                 return !0 
                 }) 
         return !0 
 } 
  
 export default jarspy