export async function all(m, { chatUpdate }) { 
         this.exam = this.exam ? this.exam : {} 
         let msg = chatUpdate.messages[0] 
         if (this.exam[m.chat]) { 
                 if (!msg.message.extendedTextMessage) return 
                 if (!(msg.message.extendedTextMessage.text == this.exam[m.chat][3]) && !(msg.message.extendedTextMessage.text == this.exam[m.chat][4]) && !(msg.message.extendedTextMessage.text == this.exam[m.chat][5])) return 
                 if (msg.message.extendedTextMessage.text == this.exam[m.chat][1].trim()) { 
                         await m.reply('Kamu benar! Jawabannya adalah ' + this.exam[m.chat][1]) 
                         clearTimeout(this.exam[m.chat][2]) 
                         delete this.exam[m.chat] 
                         // db.data.users[msg.sender].limit += 1 
                         // db.data.users[msg.sender].limitgame += 1 
                 } else { 
                         await m.reply('❌ Jawaban kamu salah, soal berakhir') 
                         clearTimeout(this.exam[m.chat][2]) 
                         delete this.exam[m.chat] 
                 } 
         } 
 }