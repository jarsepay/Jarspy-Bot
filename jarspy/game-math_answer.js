import db from '../lib/database/index.js'

let jarspy = async m => m
jarspy.before = async function (m) {
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
  let id = m.chat
  if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
  this.math = this.math ? this.math : {}
  if (!(id in this.math)) return this.reply(m.chat, 'Soal itu telah berakhir.', m)
  //if (!(id in this.math)) return this.sendButton(m.chat, 'Soal itu telah berakhir', author, null, [['math', '/math']], m)
  if (m.quoted.id == this.math[id][0].id) {
    let math = JSON.parse(JSON.stringify(this.math[id][1]))
    if (m.text == math.result) {
      const user = await db.users.get(m.sender)
      await db.users.update(m.sender, (user) => {
        user.exp += math.bonus
      })
      clearTimeout(this.math[id][3])
      delete this.math[id]
      this.reply(m.chat, `Jawaban Benar!\n+${math.bonus} XP`, m)
      //this.sendButton(m.chat, `*Jawaban Benar!*\n+${math.bonus} XP`, author, null, [['again', `/math ${math.mode}`]], m)
    } else {
      if (--this.math[id][2] == 0) {
        clearTimeout(this.math[id][3])
        delete this.math[id]
        this.reply(m.chat, `Kesempatan habis!\nJawaban: *${math.result}*`, m)
        //this.sendButton(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, author, null, [['again', `/math ${math.mode}`]], m)
      } else m.reply(`❌ Jawaban Salah!\nMasih ada ${this.math[id][2]} kesempatan`)
    }
  }
  return !0
}

export default jarspy