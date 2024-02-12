/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import claim from './rpg-claim.js'
import hourly from './rpg-hourly.js'
import daily from './rpg-daily.js'
import weekly from './rpg-weekly.js'
import monthly from './rpg-monthly.js'

import Connection from '../lib/connection.js'

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const inventory = {
  others: {
    health: true,
    level: true,
    limit: true,
    exp: true,
    role: true,
    followers: true,
    location: true,
  },
  ability: {
    token: true,
    strength: true,
    psychic: true,
    defense: true,
    speed: true,
    protection: true,
    death: true,
  },
  collections: {
    balancer: true,
    lock: true,
    lockpick: true,
    crowbar: true,
    pickaxe: true,
  },
  foodbank: {
    burger: true,
    pizza: true,
    kentang: true,
  },
  clicks: {
    click: true,
  },
  devices: {
    social: true,
    gems: true,
    telephone: true,
    smartphone: true,
  },
  items: {
    money: true,
    potion: true,
    medkit: true,
    elixir: true,
    sphere: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    orb: true,
    keping: true,
    crypto: true,
    crystal: true,
    auricore: true,
    car: true,
    fuel: true,
    gold: true,
    iron: true,
  },
  tools: {
    armor: {
      '0': '❌',
      '1': 'Leather Armor',
      '2': 'Iron Armor',
      '3': 'Gold Armor',
      '4': 'Diamond Armor',
      '5': 'Emerald Armor',
      '6': 'Crystal Armor',
      '7': 'Obsidian Armor',
      '8': 'Netherite Armor',
      '9': 'Wither Armor',
      '10': 'Dragon Armor',
      '11': 'Hacker Armor',
    },
    sword: {
      '0': '❌',
      '1': 'Wooden Sword',
      '2': 'Stone Sword',
      '3': 'Iron Sword',
      '4': 'Gold Sword',
      '5': 'Copper Sword',
      '6': 'Diamond Sword',
      '7': 'Emerald Sword',
      '8': 'Obsidian Sword',
      '9': 'Netherite Sword',
      '10': 'Samurai Slayer Green Sword',
      '11': 'Hacker Sword',
    },
    pickaxe: {
      '0': '❌',
      '1': 'Wooden Pickaxe',
      '2': 'Stone Pickaxe',
      '3': 'Iron Pickaxe',
      '4': 'Gold Pickaxe',
      '5': 'Copper Pickaxe',
      '6': 'Diamond Pickaxe',
      '7': 'Emerlad Pickaxe',
      '8': 'Crystal Pickaxe',
      '9': 'Obsidian Pickaxe',
      '10': 'Netherite Pickaxe',
      '11': 'Hacker Pickaxe',
    },
    fishingrod: true,
  },
  pets: {
    ant: 100,
    horse: 10,
    fox: 10,
    cat: 10,
    dog: 10,
    dragon: 10,
    panda: 10,
  },
  crates: {
    uncommon: true,
    common: true,
    rare: true,
    mythical: true,
    legendary: true,
    ancient: true,
  },
  cooldowns: {
    lastclaim: {
      name: 'claim',
      time: claim.cooldown
    },
    lasthourly: {
      name: 'hourly',
      time: hourly.cooldown
    },
    lastdaily: {
      name: 'daily',
      time: daily.cooldown
    },
    lastweekly: {
      name: 'weekly',
      time: weekly.cooldown
    },
    lastmonthly: {
      name: 'monthly',
      time: monthly.cooldown
    },
  }
}
let jarspy = async (m, { conn, args, usedPrefix, isPrems, isROwner }) => {
  
  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  let pengirim = who
  if (!who || !isROwner) {
    	who = m.sender
        pengirim = m.sender
  }
  let user = await db.users.get(who)
  let usar = await db.users.get(m.sender)
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (user.nama == '-') {
    throw `Kamu harus mempunyai nama agar bisa membuka inventory! Ketik */set nama <namamu>* untuk mendapatkan nama`
    return
  }
  user.role = global.rpg.role(user.level).name
  const tools = Object.keys(inventory.tools).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${typeof inventory.tools[v] === 'object' ? inventory.tools[v][user[v]?.toString()] : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
  const devices = Object.keys(inventory.devices).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const ability = Object.keys(inventory.ability).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const collections = Object.keys(inventory.collections).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const foodbank = Object.keys(inventory.foodbank).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const clicks = Object.keys(inventory.clicks).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const items = Object.keys(inventory.items).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const crates = Object.keys(inventory.crates).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${toSimple(user[v])}`).filter(v => v).join('\n').trim()
  const pets = Object.keys(inventory.pets).map(v => user[v] && `*${global.rpg.emoticon(v)}${v}:* ${user[v] >= inventory.pets[v] ? 'Max Levels' : `Level(s) ${user[v]}`}`).filter(v => v).join('\n').trim()
  const cooldowns = Object.entries(inventory.cooldowns).map(([cd, { name, time }]) => cd in user && `*⌛${name}*: ${new Date() - user[cd] >= time ? '✅' : '❌'}`).filter(v => v).join('\n').trim()
  
  if (((user.lasteat) - +new Date()) < 86400000 * 1) {
      m.reply(`Kamu butuh makan\n🍴 Waktu sebelum mati kelaparan: *${((user.lasteat) - +new Date()).toTimeString()}*`)
  }
  
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
  let apakahpremium = '❌'
  if (([conn.decodeJid(Connection.conn.user?.id || ''), ...global.owner.map(([number]) => number)].map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)) || (global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who))) {
    apakahpremium = '✅'
  }
  
  const caption = `
▢ *${user.nama} Inventory*
*────────────────────*
⭐ *Premium:* ${apakahpremium}

*⦿ Main*
${Object.keys(inventory.others).map(v => user[v] && `${global.rpg.emoticon(v)}${capitalizeFirstLetter(v)}: ${toSimple(user[v])}`).filter(v => v).join('\n')}${tools ? `
*⬡ Peralatan*
${tools}` : ``}${ability ? `
*────────────────────*
*⬡ Kemampuan*
${ability}
➔ Kemampuan Total: ${toSimple(Object.keys(inventory.ability).map(v => user[v]).reduce((a, b) => a + b, 0))} Kemampuan` : ''}${collections ? `
*────────────────────*
*⬡ Koleksi*
${collections}
➔ Jumlah Koleksi: ${toSimple(Object.keys(inventory.collections).map(v => user[v]).reduce((a, b) => a + b, 0))} Koleksi` : ''}${foodbank ? `
*────────────────────*
*⬡ Area Bank Makanan*
${foodbank}
➔ Jumlah Klik: ${Object.keys(inventory.foodbank).map(v => user[v]).reduce((a, b) => a + b, 0)} Makanan` : ''}${clicks ? `
*────────────────────*
*⬡ Poin Klik*
${clicks}
➔ Jumlah Klik: ${Object.keys(inventory.clicks).map(v => user[v]).reduce((a, b) => a + b, 0)} Klik` : ''}${devices ? `
*────────────────────*
*⬡ Perangkat*
${devices}
➔ Jumlah Perangkat: ${Object.keys(inventory.devices).map(v => user[v]).reduce((a, b) => a + b, 0)} Perangkat` : ''}${items ? `
*────────────────────*
*⬡ Barang*
${items}
➔ Jumlah Barang: ${toSimple(Object.keys(inventory.items).map(v => user[v]).reduce((a, b) => a + b, 0))} Barang` : ''}${crates ? `
*────────────────────*
*⬡ Peti*
${crates}
➔ Total Peti: ${toSimple(Object.keys(inventory.crates).map(v => user[v]).reduce((a, b) => a + b, 0))} Peti` : ''}${pets ? `
*────────────────────*
*⬡ Hewan Peliharaan*
${pets}` : ''}${cooldowns ? `
*────────────────────*
*⬡ Cooldown*
${cooldowns}` : ''}
*────────────────────*
`.trim()
  conn.sendMessage(m.chat, {
     text: caption,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: namabot,
     body: '',
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: pp,
     renderLargerThumbnail: false
     }}}, { quoted: m })
  
}
jarspy.help = ['inventory', 'inv']
jarspy.tags = ['rpg']
jarspy.command = /^(inv(entory)?|money|e?xp)$/i
export default jarspy

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
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

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");
  
  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  
  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}