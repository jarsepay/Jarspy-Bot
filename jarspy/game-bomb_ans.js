import db from '../lib/database/index.js'

export async function before(m) { 
     const user = await db.users.get(m.sender)
     try { 
         let id = m.chat; 
         let timeout = 180000; 
         let reward = randomInt(100, 800); 
         let body = typeof m.text == 'string' ? m.text : false; 
         this.bomb = this.bomb ? this.bomb : {}; 
  
         if (this.bomb[id] && m.quoted && m.quoted.id == this.bomb[id][3].id && !isNaN(body)) { 
             let json = this.bomb[id][1].find(v => v.position == body); 
             if (!json) return this.reply(m.chat, `🚩 Untuk membuka kotak kirim angka 1 - 9`, m); 
  
             if (json.emot == '💥') { 
                 json.state = true; 
                 let bomb = this.bomb[id][1]; 
                 let teks = `乂  *B O M B*\n\n`; 
                 teks += bomb.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n'; 
                 teks += bomb.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n'; 
                 teks += bomb.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n'; 
                 teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`; 
                 teks += `*Permainan selesai!*, kotak berisi bom terbuka : (- *${formatNumber(reward)}*)`; 
  
                 this.reply(m.chat, teks, m).then(() => { 
                     db.users.update(m.sender, (user) => {
                          user.exp < reward ? user.exp = 0 : user.exp -= reward; 
                            });
                     clearTimeout(this.bomb[id][2]); 
                     delete this.bomb[id]; 
                 }); 
             } else if (json.state) { 
                 return this.reply(m.chat, `🚩 Kotak ${json.number} sudah di buka silahkan pilih kotak yang lain.`, m); 
             } else { 
                 json.state = true; 
                 let changes = this.bomb[id][1]; 
                 let open = changes.filter(v => v.state && v.emot != '💥').length; 
  
                 if (open >= 8) { 
                     let teks = `乂  *B O M B*\n\n`; 
                     teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`; 
                     teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n'; 
                     teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n'; 
                     teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n'; 
                     teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`; 
                     teks += `*Permainan selesai. Kotak berisi bom tidak terbuka* : (+ *${formatNumber(reward)}*)`; 
  
                     this.reply(m.chat, teks, m).then(() => { 
                         db.users.update(m.sender, (user) => {
                          user.exp += reward; 
                            });
                         clearTimeout(this.bomb[id][2]); 
                         delete this.bomb[id]; 
                     }); 
                 } else { 
                     let teks = `乂  *B O M B*\n\n`; 
                     teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`; 
                     teks += changes.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n'; 
                     teks += changes.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n'; 
                     teks += changes.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n'; 
                     teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`; 
                     teks += `*Kotak berisi bom tidak terbuka* : (+ *${formatNumber(reward)}*)`; 
  
                     this.relayMessage(m.chat, { 
                     protocolMessage: { 
                         key: this.bomb[id][3], 
                         type: 14, 
                         editedMessage: { 
                             conversation: teks 
                         } 
                     } 
                 }, {}).then(() => {
                         db.users.update(m.sender, (user) => {
                          user.exp += reward; 
                            });
                         });
                 } 
             } 
         }
     } catch (e) { 
         return this.reply(m.chat, e, m); 
     } 
     return !0; 
 
 } 
 export const exp = 0; 
  
 function randomInt(min, max) { 
     return Math.floor(Math.random() * (max - min + 1)) + min; 
 } 
  
 function formatNumber(number) { 
     return number.toLocaleString(); 
 }