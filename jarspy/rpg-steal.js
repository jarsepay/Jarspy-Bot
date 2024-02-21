import db from '../lib/database/index.js'

const items = [
  'money', 'potion',
  'trash', 'wood',
  'rock', 'string', 'iron',
  'gold', 'diamond', 'emerald', 'ducky', 'orb', 'keping', 'crypto', 'crystal',
  'telephone', 'smartphone',
  'kentang', 'burger', 'pizza',
  'uncommon', 'common', 'rare', 'mythical', 'legendary', 'ancient',
  'dolar', 'euro', 'yen', 'pound', 'rupee', 'yuan', 'won', 'rubel', 'peso', 'real', 'rupiah', 'gems', 'token',
  'ironore', 'goldore', 'diamondore', 'ancientdebris', 'pickaxe', 'fishingrod', 'sword', 'armor', 'silver', 'light_gold',
  'elang', 'beruang', 'harimau', 'buaya', 'bebek', 'ayam', 'koala', 'zebra', 'sapi', 'babi', 'banteng', 'kerbau', 'kelinci', 'tupai', 'serigala', 'domba', 'kelelawar', 'landak', 'kangguru', 'trenggiling', 'badak', 'gajah',
]

let confirmation = {}
let cooldown = 450000

async function jarspy(m, { conn, args, usedPrefix, command, isPrems }) {
  if (confirmation[m.sender]) return m.reply('Kamu sedang melakukan pencurian')
  
  const user = await db.users.get(m.sender)
  const timers = (cooldown - (new Date() - user.laststeal))
  
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  
  if (new Date() - user.laststeal < cooldown) {
    throw `Kamu sudah melakukan pencurian. Tunggu selama *${((user.laststeal + cooldown) - new Date()).toTimeString()}*`
  }
  
  const item = items.filter(v => v in user && typeof user[v] === 'number')
  
  let lol = `
Contoh pemakaian: ${usedPrefix}${command} money 9999 @${global.nomorowner}

▢ Barang yang bisa dicuri:
${item.map(v => `${rpg.emoticon(v)}${v}`.trim()).join('\n')}
`.trim()
  
  const type = (args[0] || '').toLowerCase()
  
  if (!item.includes(type)) {
    return m.reply(lol)
  }
  
  if (!args[1]) {
    m.reply(lol)
    return
  }   
  
  const count = Math.min(Math.max(1, (isNumber(args[1]) ? parseInt(args[1].replace(/[^\d.-]/g, "")) : (args[1].toUpperCase().replace(/[^\d.]/g, "") * ({"K":1000,"M":1e6,"B":1e9,"T":1e12,"QA":1e15,"QI":1e18,"SX":1e21,"SP":1e24,"OC":1e27,"N":1e30,"DC":1e33,"UD":1e36,"DD":1e39,"TD":1e42,"QUA":1e45,"QUI":1e48, "SXD":1e51, "SPD":1e54, "OCD":1e57, "NOD":1e60, "VG":1e63}[args[1].toUpperCase().replace(/\d/g, '')] || 1)))));
  
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
  
  if (!who) return m.reply('Tag salah satu, atau ketik nomornya')
  
  let _user = await db.users.get(who)
  
  if (_user.level < 2 || user.level < 2) {
    return m.reply(`Minimal level pencuri dan korban adalah 2`)
  }
  
  if (_user.protection > user.strength) {
    return m.reply(`Protection yang dimiliki olehnya lebih tinggi dari kekuatan kamu`)
  }
  
  if (_user.lock >= 1) {
    if (user.lockpick < 1) {
      m.reply('Inventory-nya terkunci dengan 🔒 Lock\n(Kamu membutuhkan 🗝️ Lockpick untuk membuka 🔒 Lock)')
      await db.users.update(m.sender, (user) => {
        user.laststeal = new Date() * 1
      })
      return
    }
    
    if (user.lockpick < _user.lock) {
      m.reply(`Inventory-nya terkunci dengan 🔒 Lock\n(🗝️ Lockpick kamu kurang ${_user.lock - user.lockpick})`)
      await db.users.update(who, (_user) => {
        _user.lock -= user.lockpick
      })
      await db.users.update(m.sender, (user) => {
        user.lockpick = 0
        user.laststeal = new Date() * 1
      })
      return
    }
    
    await db.users.update(m.sender, (user) => {
      user.lockpick -= _user.lock
    })
    await db.users.update(who, (_user) => {
      _user.lock = 0
    })
  }
  
  if (user.safezone) {
    return m.reply(`Kamu tidak bisa mencuri bila sedang berada di zona aman`)
  }
  
  if (_user.safezone) {
    return m.reply(`Kamu tidak bisa mencuri orang yang berada di zona aman`)
  }
  
  let max_steal = user.social
  if (max_steal > 100) {
      max_steal = 100
  }
    
  if (_user[type] * (max_steal / 100) < count) {
    return m.reply(`*${rpg.emoticon(type)}${type}${special(type)}* yang dimilikinya kurang *${toSimple(count * 100 / max_steal - _user[type])}*\nKamu hanya bisa mencuri maksimal ${max_steal}% dari barang tersebut atau ${toSimple(_user[type] * (max_steal / 100))} ${rpg.emoticon(type)}${type}${special(type)}!`)
  }
  
  let confirm = `
Apakah kamu yakin akan mencuri *${toSimple(count)}* ${rpg.emoticon(type)}${type}${special(type)} dari *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ?
Timeout *60* detik
`.trim()
  
  let c = '© 2023'
  
  conn.sendButton(m.chat, confirm, c, null, [['✅'], ['❌']], m, { mentions: [who] })
  
  confirmation[m.sender] = {
    sender: m.sender,
    to: who,
    message: m,
    type,
    count,
    timeout: setTimeout(() => (m.reply('Timeout'), delete confirmation[m.sender]), 60 * 1000)
  }
}

jarspy.before = async m => {
  if (m.isBaileys) return
  if (!(m.sender in confirmation)) return
  if (!m.text) return
  let { timeout, sender, message, to, type, count } = confirmation[m.sender]
  if (m.id === message.id) return
  let user = await db.users.get(sender)
  let _user = await db.users.get(to)
  if (/❌|no?/g.test(m.text.toLowerCase())) {
    clearTimeout(timeout)
    delete confirmation[sender]
    return m.reply('Pencurian dibatalkan')
  }
  if ((/✅|y(es)?/g.test(m.text.toLowerCase())) && (+new Date() > user.lastcommand)) {
    user.lastcommand = +new Date() + 1000;
        
    let previous = user[type] * 1
    let _previous = _user[type] * 1
    await db.users.update(sender, (user) => {
      user[type] += count * 1
      user.steal += 1
      user.laststeal = new Date() * 1
    })
    await db.users.update(to, (_user) => {
      _user[type] -= count * 1
    })
    user = await db.users.get(sender)
    _user = await db.users.get(to)
    if (previous < user[type] * 1 && _previous > _user[type] * 1) {
      m.reply(`Berhasil mencuri *${toSimple(count)}* ${rpg.emoticon(type)}${type}${special(type)} dari *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
    } else {
      await db.users.update(sender, (user) => {
        user[type] = previous
      })
      await db.users.update(to, (_user) => {
        _user[type] = _previous
      })
      m.reply(`Gagal mencuri *${toSimple(count)}* ${rpg.emoticon(type)}${type}${special(type)} dari *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
    }
    clearTimeout(timeout)
    delete confirmation[sender]
  }
}

jarspy.help = ['steal']
jarspy.tags = ['rpg']
jarspy.command = /^(steal)$/i

jarspy.cooldown = cooldown

export default jarspy

function special(type) {
  let b = type.toLowerCase()
  let special = (['uncommon', 'common', 'rare', 'mythical', 'legendary', 'ancient'].includes(b) ? ' Crate' : '')
  return special
}

function isNumber(x) {
  return !isNaN(x)
}

function toSimple(number) {
  if (isNaN(parseFloat(number))) return number;
  if (parseFloat(number) === 0) return '0';
  number = parseFloat(number).toFixed(0);
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg'];
  const base = 1000;
  const exponent = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[exponent] || '';
  const simplified = number / Math.pow(base, exponent);
  const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 });
  return formatter.format(simplified) + suffix;
}