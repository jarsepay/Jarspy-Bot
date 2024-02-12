/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'
import { areJidsSameUser } from '@whiskeysockets/baileys'
import { getUserCache } from './_cache.js';

const leaderboards = [
  'death',
  'followers',
  'social',
]
let jarspy = async (m, { conn, args, participants, usedPrefix, command }) => {
  let users = getUserCache();
  let leaderboard = leaderboards.filter(v => v && users.filter(user => user && user[v]).length)
  let type = (args[0] || '').toLowerCase()
  const getPage = (item) => Math.ceil((users.filter(user => user && user[item]).length) / 10)
  let wrong = `
Contoh pemakaian: *${usedPrefix}${command} social*

▢ Daftar Tipe
${leaderboard.map(v => `
${rpg.emoticon(v)}${v}
`.trim()).join('\n')}
`.trim()
  if (!leaderboard.includes(type)) return m.reply(wrong)
  let page = isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type)) : 0
  let sortedItem = users.map(toNumber(type)).sort(sort(type))
  let userItem = sortedItem.map(enumGetKey)
  let text = `
• *${rpg.emoticon(type)}${type} Halaman Papan Peringkat ${page} dari ${getPage(type)}* •
Kamu: *${userItem.indexOf(m.sender) + 1}* of *${userItem.length}*

${sortedItem.slice(page * 10, page * 10 + 10).map((user, i) => `${i + 1}. ${participants.some(p => areJidsSameUser(user.jid, p.id)) ? `(${conn.getName(user.jid)}) wa.me/` : '@'}${user.jid.split`@`[0]} *${toSimple(user[type])} ${rpg.emoticon(type)}${type}*`).join`\n`}
`.trim()
   await m.reply(text, null, {
    mentions: [...userItem.slice(page * 10, page * 10 + 10)].filter(v => !participants.some(p => areJidsSameUser(v, p.id)))
  })
}
jarspy.help = ['top']
jarspy.tags = ['rpg']
jarspy.command = /^(top)$/i

export default jarspy

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}


/**
 * Detect Number
 * @param {Number} x 
 */
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