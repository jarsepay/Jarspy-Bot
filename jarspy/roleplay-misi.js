import { promises, readFileSync } from 'fs'
import db from '../lib/database/index.js'
let misi = JSON.parse(readFileSync('./lib/misi.json'))
async function jarspy(m, { conn, args, text , usedPrefix, command }) {
  //conn.mission = conn.mission || {}
  conn.mission = conn.mission ? conn.mission : {}
  if(m.sender in conn.mission) return m.reply("Kamu masih melakukan misi, tunggu sampai selesai!")

  try {
    let json = misi[Math.floor(Math.random() * misi.length)] //get misi
    const cooldown = 5 * (1000 * 60) //coldown timer second
    let user = await db.users.get(m.sender) //Get db user
    
    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (user.skill == '-') {
        throw 'Tidak bisa menjalankan misi karena kamu belum mempunyai skill, ketik */pilihskill* untuk memilih'
      return
    }
    if (user.health == 20) return m.reply(`Darah kamu kurang dari 20`)

    if(typeof user.lastmisi != "number") user.lastmisi = 0
    if(typeof user.exp != "number") user.exp = 0
    if(typeof user.crystal != "number") user.crystal = 0

    let timers = (cooldown - (new Date - user.lastmisi))
    if(new Date - user.lastmisi <= cooldown) return m.reply(`Tunggu selama 🕐${clockString(timers)}`)

    if(!(m.sender in conn.mission)) {
      conn.mission[m.sender] = {
        sender: m.sender,
        timeout: setTimeout(() => {m.reply('timed out');delete conn.mission[m.sender]}, 300000),
        json
      }
      //Caption
      let caption = `*A MISSION HAS BEEN GIVEN TO THE HUNTER! (BETA)*
*🥇 RANK:* ${json.rank}
*📰 MISI:* ${json.misii}
*🎁 GIFT:* Exp ${json.exp} & Crystal Mana ${json.crystal}
${ json.title ? `*🔖 TITLE:* ${json.title}` : '\n'}${json.gems ? `Gems: ${json.gems}` : `\n`}

Pilih Opsional
- Accept (Terima Misi)
- Cancel (Tolak Misi)
`
      return conn.reply(m.chat, caption, m) //SendMessage
    }
  } catch (e) {
    console.error(e)
    if(m.sender in conn.mission) {
      let { timeout } = conn.mission[m.sender]
      clearTimeout(timeout)
      delete conn.mission[m.sender]
      m.reply('Rejected')
    }
  }
}

jarspy.before = async (m, { conn }) => {
  //conn.mission = conn.mission || {}
  conn.mission = conn.mission ? conn.mission : {}
  if(!(m.sender in conn.mission)) return
  if(m.isBaileys) return

  let { timeout, json } = conn.mission[m.sender]
  const cooldown = 5 * (1000 * 60) //coldown timer second
  let user = await db.users.get(m.sender) //Get db user

  let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase()
  if(txt != "accept" && txt != "cancel" && txt != "gas") return

  if(typeof user.lastmisi != "number") user.lastmisi = 0
  if(typeof user.exp != "number") user.exp = 0
  if(typeof user.crystal != "number") user.crystal = 0

  let timers = (cooldown - (new Date - user.lastmisi))
  if(new Date - user.lastmisi <= cooldown) return m.reply(`Tunggu selama 🕐${clockString(timers)}`)
  if(!user.skill) return m.reply("Kamu belum mempunyai skill")

  let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
  let randomkamu = `${Math.floor(Math.random() * 81)}`.trim() //hehe Biar Susah Menang :v
  let Aku = (randomaku * 1)
  let Kamu = (randomkamu * 1)
  let aud = ["Mana Habis", "Stamina Habis", "Diserang Monster", "Dibokong Monster"]
  let aui = aud[Math.floor(Math.random() * aud.length)]

  //Gacha systemBeta
  try {
    if(/^accept?$/i.test(txt)) {
      if(Aku > Kamu) {
       // var cpt = `Berhasil menyelesaikan misi ${json.misii}`
        m.reply(`${json.title ? `Berhasil menyelesaikan misi ${json.misii}. Kamu berhasil mendapat gelar ${json.title}!`: ""}`)
       // m.reply(cpt)
        await db.users.update(m.sender, (user) => {
        user.exp += json.exp
        user.crystal += json.crystal
        user.title += json.title
        user.misi += json.misii
        })
      } else if(Aku < Kamu) {
        var flr = `Gagal menyelesaikan misi ${json.misii}dikarenakan ${aui}. Darah berkurang sebanyak ${json.health} ❤️`
        m.reply(flr)
        await db.users.update(m.sender, (user) => {
        user.health -= json.health
        })
      } else {
       // var cpe = `Berhasil menyelesaikan misi ${json.misii}`
        m.reply(`${json.title ? `Berhasil menyelesaikan misi ${json.misii}. Kamu berhasil mendapat gelar ${json.title}!`: ""}`)
       // m.reply(cpe)
        await db.users.update(m.sender, (user) => {
        user.exp += json.exp
        user.crystal += json.crystal
        user.title += json.title
        user.misi += json.misii
        })
      }
      await db.users.update(m.sender, (user) => {
      user.lastmisi = new Date * 1
      })
      clearTimeout(timeout)
      delete conn.mission[m.sender]
      return !0
    } else if (/^cancel?$/i.test(txt)) {
      clearTimeout(timeout)
      delete conn.mission[m.sender]
      m.reply('Canceled')
      await db.users.update(m.sender, (user) => {
      user.lastmisi = new Date * 1
      })
      return !0
    }
  } catch (e) {
    clearTimeout(timeout)
    delete conn.mission[m.sender]
    //if (moneyDulu > (user.money * 1)) user.money = moneyDulu * 1
    m.reply('Error saat pengambilan misi (Rejected)')
    console.log("\n".repeat(3))
    console.log(e.stack)
    return !0
  } finally {
    clearTimeout(timeout)
    delete conn.mission[m.sender]
    return !0
  }
}

jarspy.help = ['mission']
jarspy.tags = ['roleplay']
jarspy.command = /^(m(isi)?(ission)?)$/i
jarspy.limit = true

export default jarspy


/**
 * Detect if thats number
 * @param {Number} x
 * @returns Boolean
 */
function number(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}

/**
 * Random pick from Array
 * @param {Array} list
 * @returns Any
 */
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Convert milliseconds to clock string
 * @param {Number} ms
 * @returns String
 */
 function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['\n ' + d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}