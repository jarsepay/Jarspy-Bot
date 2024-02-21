/*
  • Created by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let cooldown = 900000

let jarspy = async (m, { isPrems, args, conn, text, usedPrefix, command }) => {
let user = await db.users.get(m.sender)
if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
let timers = (cooldown - (new Date() - user.lastberburu))
let count = `${Math.floor(Math.random() * 80)}`
    if (user.job == 'hunter') {
    if (user.health < 60) {
    conn.reply(m.chat, `Untuk pergi berburu, dibutuhkan sedikitnya 60 Darah!
Kamu bisa membeli darah ❤️ dengan ketik *${usedPrefix}buy potion <jumlah>*,
dan ketik *${usedPrefix}heal <jumlah>* untuk menggunakan potion!
`.trim(), m)
   return
  }
    if (new Date() - user.lastberburu <= cooldown) return m.reply(`
Kamu sudah berburu tadi. Silakan tunggu selama *🕐${timers.toTimeString()} agar dapat berburu lagi*
`.trim())
    if (user.car < 1 || user.fuel < 10 && user.busur < 1 && user.anakpanah < 20 || user.glock < 1 && user.ammo < 20 || user.ak47 < 1 && user.m4 < 1 && user.m16 < 1 && user.ar15 < 1 && user.scar < 1 && user.famas < 1 && user.aug < 1 && user.uzi < 1 && user.mp5 < 1 && user.p90 < 1 && user.mac10 < 1 && user.vector < 1 && user.barrettm82 < 1 && user.remington700 < 1 && user.dragunovsvd < 1 && user.m40 < 1 && user.m24 < 1) {
    throw 'Kamu harus minimal memiliki salah satu senjata api, 1 glock, 1 busur, 20 anak panah, dan 20 ammo di gun shop! Serta 1 car dan 10 fuel. Ketik */gunshop* untuk membeli senjata.'
    return
  }
    let name = conn.getName(m.sender)

        let randomaku1 = `${Math.floor(Math.random() * 10)}`
        let randomaku2 = `${Math.floor(Math.random() * 10)}`
        let randomaku4 = `${Math.floor(Math.random() * 10)}`
        let randomaku3 = `${Math.floor(Math.random() * 10)}`
        let randomaku5 = `${Math.floor(Math.random() * 10)}`
        let randomaku6 = `${Math.floor(Math.random() * 10)}`
        let randomaku7 = `${Math.floor(Math.random() * 10)}`
        let randomaku8 = `${Math.floor(Math.random() * 10)}`
        let randomaku9 = `${Math.floor(Math.random() * 10)}`
        let randomaku10 = `${Math.floor(Math.random() * 10)}`
        let randomaku11 = `${Math.floor(Math.random() * 10)}`
        let randomaku12 = `${Math.floor(Math.random() * 10)}`
        let randomaku13 = `${Math.floor(Math.random() * 10)}`
        let randomaku14 = `${Math.floor(Math.random() * 10)}`
        let randomaku15 = `${Math.floor(Math.random() * 10)}`
        let randomaku16 = `${Math.floor(Math.random() * 10)}`
        let randomaku17 = `${Math.floor(Math.random() * 10)}`
        let randomaku18 = `${Math.floor(Math.random() * 10)}`
        let randomaku19 = `${Math.floor(Math.random() * 10)}`
        let randomaku20 = `${Math.floor(Math.random() * 10)}`
        let randomaku21 = `${Math.floor(Math.random() * 10)}`
        let randomaku22 = `${Math.floor(Math.random() * 10)}`
        let bahanbakar = `${Math.floor(Math.random() * 10)}`
        let anakp = `${Math.floor(Math.random() * 20)}`
        let ammmo = `${Math.floor(Math.random() * 20)}`
        let heal = `${Math.floor(Math.random() * 100)}`
            .trim()

        let rbrb1 = (randomaku1 * 1)
        let rbrb2 = (randomaku2 * 1)
        let rbrb3 = (randomaku3 * 1)
        let rbrb4 = (randomaku4 * 1)
        let rbrb5 = (randomaku5 * 1)
        let rbrb6 = (randomaku6 * 1)
        let rbrb7 = (randomaku7 * 1)
        let rbrb8 = (randomaku8 * 1)
        let rbrb9 = (randomaku9 * 1)
        let rbrb10 = (randomaku10 * 1)
        let rbrb11 = (randomaku11 * 1)
        let rbrb12 = (randomaku12 * 1)
        let rbrb13 = (randomaku13 * 1)
        let rbrb14 = (randomaku14 * 1)
        let rbrb15 = (randomaku15 * 1)
        let rbrb16 = (randomaku16 * 1)
        let rbrb17 = (randomaku17 * 1)
        let rbrb18 = (randomaku18 * 1)
        let rbrb19 = (randomaku19 * 1)
        let rbrb20 = (randomaku20 * 1)
        let rbrb21 = (randomaku21 * 1)
        let rbrb22 = (randomaku22 * 1)
        let fuel = (bahanbakar * 1)
        let anakpa = (anakp * 1)
        let ammoe = (ammmo * 1)
        let healt = (heal * 1)

        let anti1 = `${rbrb1}`
        let anti2 = `${rbrb2}`
        let anti3 = `${rbrb3}`
        let anti4 = `${rbrb4}`
        let anti5 = `${rbrb5}`
        let anti6 = `${rbrb6}`
        let anti7 = `${rbrb7}`
        let anti8 = `${rbrb8}`
        let anti9 = `${rbrb9}`
        let anti10 = `${rbrb10}`
        let anti11 = `${rbrb11}`
        let anti12 = `${rbrb12}`
        let anti13 = `${rbrb13}`
        let anti14 = `${rbrb14}`
        let anti15 = `${rbrb15}`
        let anti16 = `${rbrb16}`
        let anti17 = `${rbrb17}`
        let anti18 = `${rbrb18}`
        let anti19 = `${rbrb19}`
        let anti20 = `${rbrb20}`
        let anti21 = `${rbrb21}`
        let anti22 = `${rbrb22}`
        let fuel1 = `${fuel}`
        let anakpanah = `${anakpa}`
        let ammo = `${ammoe}`
        let healt1 = `${healt}`

         let hsl = `*≡ Hasil Berburu*

*🦅 = [ ${anti1} ]*         *🦬 = [ ${anti12} ]*
*🐻 = [ ${anti2} ]*         *🐇 = [ ${anti13} ]*
*🐅 = [ ${anti3} ]*         *🐿️ = [ ${anti14} ]*
*🐊 = [ ${anti4} ]*         *🐺 = [ ${anti15} ]*
*🦆 = [ ${anti5} ]*         *🐑 = [ ${anti16} ]*
*🐓 = [ ${anti6} ]*         *🦇 = [ ${anti17} ]*
*🐨 = [ ${anti7} ]*         *🦔 = [ ${anti18} ]*
*🦓 = [ ${anti8} ]*         *🦘 = [ ${anti19} ]*
*🐄 = [ ${anti9} ]*         *🦡 = [ ${anti20} ]*
*🐷 = [ ${anti10} ]*         *🦏 = [ ${anti21} ]*
*🐃 = [ ${anti11} ]*         *🐘 = [ ${anti22} ]*

*≡ Hasil Lain*
❤️ Darah berkurang sebanyak *${healt1}*
🧤 *+2* Tingkat Kerja Keras
➖ Ammo berkurang sebanyak *${ammo}*
🏹 Anak panah berkurang sebanyak *${anakpanah}*
⛽ Fuel berkurang sebanyak *${fuel1}*

Ketik */kandang* untuk melihat hasil buruan`

        setTimeout(() => {
            conn.reply(m.chat, 'Sedang menyiapkan senapan untuk berburu...', m);
        }, 0);

        setTimeout(() => {
            conn.reply(m.chat, 'Kamu memasukkan beberapa senjata ke dalam tas dan langsung pergi ke hutan', m);
        }, 10000);

        setTimeout(() => {
            conn.reply(m.chat, 'Kamu pun sampai di tempat perburuan dan mulai melakukan berburu...', m);
        }, 15000);

        setTimeout(() => {
            conn.reply(m.chat, 'Mangsa terlihat! Kamu pun melancarkan aksimu...', m);
            db.users.update(m.sender, (user) => {
                user.health -= healt1;
            });
        }, 20000);
        
        setTimeout(() => {
                db.users.update(m.sender, (user) => {
                    user.elang += rbrb1
                    user.beruang += rbrb2
                    user.harimau += rbrb3
                    user.buaya += rbrb4
                    user.bebek += rbrb5
                    user.ayam += rbrb6
                    user.koala += rbrb7
                    user.zebra += rbrb8
                    user.sapi += rbrb9
                    user.babi += rbrb10
                    user.banteng += rbrb11
                    user.kerbau += rbrb12
                    user.kelinci += rbrb13
                    user.tupai += rbrb14
                    user.serigala += rbrb15
                    user.domba += rbrb16
                    user.kelelawar += rbrb17
                    user.landak += rbrb18
                    user.kangguru += rbrb19
                    user.trenggiling += rbrb20
                    user.badak += rbrb21
                    user.gajah += rbrb22
                    user.jobexp += 2
                    user.fuel -= fuel
                    user.ammo -= ammoe
                    user.anakpanah -= anakpa
                });
                conn.reply(m.chat, hsl, m);
        }, 30000);
        
    await db.users.update(m.sender, (user) => {
        user.lastberburu = new Date * 1;
    });
    return;
}
await conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai hunter', m);
}
jarspy.help = ['berburu']
jarspy.tags = ['rpg']
jarspy.command = /^berburu|hunt|hunting$/i

jarspy.cooldown = cooldown

export default jarspy