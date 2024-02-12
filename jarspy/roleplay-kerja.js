/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { googleImage, pinterest } from '@bochilteam/scraper';
import db from '../lib/database/index.js';

const cooldown = 3600300;

let jarspy = async (m, { conn, text, usedPrefix }) => {
    let user = await db.users.get(m.sender)

    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (new Date() - user.lastkerja < cooldown) {
        throw `Kamu sudah pergi bekerja sebelumnya. Tunggu selama *${((user.lastkerja + cooldown) - new Date()).toTimeString()}* untuk bekerja lagi`;
    }

    if (user.job == '-') {
        throw 'Kamu belum mempunyai pekerjaan. Ketik */lamarkerja* untuk melamar pekerjaan'
      return
    }

if (user.job == 'gojek') {
    let moneygojek = `${Math.floor(Math.random() * 12000)}`.trim()
    let expgojek = `${Math.floor(Math.random() * 5)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneygojek * 1
    user.jobexp += expgojek * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari driving gojek* 

◦ Money : ${formatRp(moneygojek)}
◦ Tingkat Kerja Keras : +${expgojek} 🧤`
    
        conn.reply(m.chat, message, m)
  };
  
if (user.job == 'kantoran') {
    let moneykantor = `${Math.floor(Math.random() * 32000)}`.trim() 
    let expkantor = `${Math.floor(Math.random() * 15)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneykantor * 1
    user.jobexp += expkantor * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari kerja kantoran* 

◦ Money : ${formatRp(moneykantor)}
◦ Tingkat Kerja Keras : +${expkantor} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'game developer') {
    let moneygame = `${Math.floor(Math.random() * 420000)}`.trim() 
    let expgame = `${Math.floor(Math.random() * 25)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneygame * 1
    user.jobexp += expgame * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari developing game* 

◦ Money : ${formatRp(moneygame)}
◦ Tingkat Kerja Keras : +${expgame} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'backend developer') {
    let moneybackend = `${Math.floor(Math.random() * 130000)}`.trim() 
    let expbackend = `${Math.floor(Math.random() * 35)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneybackend * 1
    user.jobexp += expbackend * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari pekerjaan backend developer* 

◦ Money : ${formatRp(moneybackend)}
◦ Tingkat Kerja Keras : +${expbackend} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'web developer') {
    let moneyweb = `${Math.floor(Math.random() * 72000)}`.trim() 
    let expweb = `${Math.floor(Math.random() * 45)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneyweb * 1
    user.jobexp += expweb * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari developing website* 

◦ Money : ${formatRp(moneyweb)}
◦ Tingkat Kerja Keras : +${expweb} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'sopir') {
    let moneysopir = `${Math.floor(Math.random() * 26000)}`.trim() 
    let expsopir = `${Math.floor(Math.random() * 13)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneysopir * 1
    user.jobexp += expsopir * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari pekerjaan sopir truk* 

◦ Money : ${formatRp(moneysopir)}
◦ Tingkat Kerja Keras : +${expsopir} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'kurir') {
    let moneykurir = `${Math.floor(Math.random() * 15000)}`.trim() 
    let expkurir = `${Math.floor(Math.random() * 7)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneykurir * 1
    user.jobexp += expkurir * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari pekerjaan ngurir* 

◦ Money : ${formatRp(moneykurir)}
◦ Tingkat Kerja Keras : +${expkurir} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'frontend developer') {
    let moneyfrontend = `${Math.floor(Math.random() * 52000)}`.trim() 
    let expfrontend = `${Math.floor(Math.random() * 55)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneyfrontend * 1
    user.jobexp += expfrontend * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari frontend developer* 

◦ Money : ${formatRp(moneyfrontend)}
◦ Tingkat Kerja Keras : +${expfrontend} 🧤`
    
        conn.reply(m.chat, message, m)
  };
  
if (user.job == 'fullstack developer') {
    let moneyfullstack = `${Math.floor(Math.random() * 210000)}`.trim() 
    let expfullstack = `${Math.floor(Math.random() * 70)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneyfullstack * 1
    user.jobexp += expfullstack * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari fullstack developer* 

◦ Money : ${formatRp(moneyfullstack)}
◦ Tingkat Kerja Keras : +${expfullstack} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'pemain sepak bola') {
    let moneyfc = `${Math.floor(Math.random() * 900000)}`.trim() 
    let expfc  = `${Math.floor(Math.random() * 180)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneyfc * 1
    user.jobexp += expfc * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari permainan 1 match tadi* 

◦ Money : ${formatRp(moneyfc)}
◦ Tingkat Kerja Keras : +${expfc} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'karyawan indomaret') {
    let moneyindomaret = `${Math.floor(Math.random() * 27000)}`.trim() 
    let expindomaret = `${Math.floor(Math.random() * 20)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneyindomaret * 1
    user.jobexp += expindomaret * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari menjadi karyawan indomaret* 

◦ Money : ${formatRp(moneyindomaret)}
◦ Tingkat Kerja Keras : +${expindomaret} 🧤`
    
        conn.reply(m.chat, message, m)
  };
  
if (user.job == 'polisi') {
    let moneypolisi = `${Math.floor(Math.random() * 31000)}`.trim() 
    let exppolisi = `${Math.floor(Math.random() * 20)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneypolisi * 1
    user.jobexp += exppolisi * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari kepolisian* 

◦ Money : ${formatRp(moneypolisi)}
◦ Tingkat Kerja Keras : +${exppolisi} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'trader') {
    let moneytrader = `${Math.floor(Math.random() * 1700000)}`.trim() 
    let exptrader = `${Math.floor(Math.random() * 300)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneytrader * 1
    user.jobexp += exptrader * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari hasil trading* 

◦ Money : ${formatRp(moneytrader)}
◦ Tingkat Kerja Keras : +${exptrader} 🧤`
    
        conn.reply(m.chat, message, m)
  };

if (user.job == 'dokter') {
    let moneydokter = `${Math.floor(Math.random() * 17000)}`.trim() 
    let expdokter = `${Math.floor(Math.random() * 15)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneydokter * 1
    user.jobexp += expdokter * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari hasil menyembuhkan pasien* 

◦ Money : ${formatRp(moneydokter)}
◦ Tingkat Kerja Keras : +${expdokter} 🧤`
    
        conn.reply(m.chat, message, m)
  };
  
if (user.job == 'hunter') {
    let moneyhunter = `${Math.floor(Math.random() * 1700000)}`.trim() 
    let exphunter = `${Math.floor(Math.random() * 300)}`.trim()
    await db.users.update(m.sender, (user) => {
    user.money += moneyhunter * 1
    user.jobexp += exphunter * 1
    user.lastkerja = new Date() * 1
   })    
   let message =  `*Berikut pendapatan dari hasil berburu* 

◦ Money : ${formatRp(moneyhunter)}
◦ Tingkat Kerja Keras : +${exphunter} 🧤`
    
        conn.reply(m.chat, message, m)
  };
    
};
jarspy.help = ['kerja']
jarspy.tags = ['roleplay']
jarspy.command = /^(kerja)$/i

jarspy.cooldown = cooldown

export default jarspy

function formatRp(angka) {
  var reverse = angka.toString().split('').reverse().join('')
  var ribuan = reverse.match(/\d{1,3}/g)
  ribuan = ribuan.join('.').split('').reverse().join('')
  return 'Rp. ' + ribuan
};