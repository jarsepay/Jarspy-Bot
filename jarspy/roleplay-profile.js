/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';
import Connection from '../lib/connection.js';
import { getUserCache } from './_cache.js';

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const inventory = {
  others: {
    nama: true,
    role: true,
    umur: true,
    gender: true,
    skill: true,
    location: true,
  },
};

let jarspy = async (m, { conn, args, text, usedPrefix, command, isROwner }) => {
  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
  let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
  if (!who) {
    who = m.sender;
  }
  const user = await db.users.get(who);
  const usar = await db.users.get(m.sender);
  let users = getUserCache();
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg');
  let followers = users.filter(user => user.following.includes(who)).map(follower => Object.values(follower)[0].slice(0, -5)).length;
    
  if (usar.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  if (!user) return m.reply(`Pengguna ${who} tidak ada dalam database`);
  // Make sure role is correct
  user.role = global.rpg.role(user.level).name;
  const others = Object.keys(inventory.others).map(v => user[v] && `*◦ ${capitalizeFirstLetter(v)}:* ${typeof inventory.others[v] === 'object' ? inventory.others[v][user[v]?.toString()] : `${user[v]}`}`).filter(v => v).join('\n').trim();
  let pasangan = user.partner;
  if (user.partner != '-') {
    let _user = await db.users.get(user.partner);
    pasangan = `${_user.nama}`;
  } else if (user.partner == '-') {
    pasangan = user.partner;
  }

  let belumsetprofile = '';
  if (user.nama == '-' && user.gender == 'non-binary' && user.umur == '-') {
    belumsetprofile = `\n\nKetik /set untuk mengatur profil`;
  }


  let apakahpremium = '❌';
  if (([conn.decodeJid(Connection.conn.user?.id || ''), ...global.owner.map(([number]) => number)].map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who)) || (global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(who))) {
    apakahpremium = '✅';
  }

  const caption = `
○ Data Diri *${conn.getName(who)}*

○ Username: ${user.nama}
○ Premium: ${apakahpremium}

*≡ Informasi*
${others ? `${others}` : ''}

╭───[ *Sosial* ]────
│💐 *Pacar:* ${pasangan}
│👥 *Followers:* ${followers}
│✨ *Poin Sosial:* ${user.social}${belumsetprofile}
╰─────────────────···
`.trim();
  conn.sendMessage(m.chat, {
     text: caption,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wmtitle,
     body: wmbody,
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: pp,
     renderLargerThumbnail: false
     }}}, { quoted: m });

  if (apakahpremium == '✅' && !isROwner) {
    conn.reply(who, `*[ ! ]* Profile kamu baru saja diperiksa oleh *@${m.sender.split('@')[0]}*`, m, { mentions: [m.sender] });
  }
};

jarspy.help = ['profile'];
jarspy.tags = ['roleplay'];
jarspy.command = /^(view|profile|pp|profil)$/i;

export default jarspy;

function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == 'number' && !isNaN(number);
}

function toSimple(number) {
  if (!isNumber(number)) return number;
  number = parseInt(number * 1);
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(number);
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