/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

const items = {
    pasarbuy: {
        elang: {
            money: 40000
        },
        beruang: {
            money: 40000,
        },
        harimau: {
            money: 40000,
        },
        buaya: {
            money: 40000,
        },
        bebek: {
            money: 40000,
        },
        ayam: {
            money: 40000,
        },
        koala: {
            money: 40000,
        },
        zebra: {
            money: 40000,
        },
        sapi: {
            money: 40000,
        },
        babi: {
            money: 40000,
        },
        banteng: {
            money: 40000,
        },
        kerbau: {
            money: 40000,
        },
        kelinci: {
            money: 40000,
        },
        tupai: {
            money: 40000,
        },
        serigala: {
            money: 40000,
        },
        domba: {
            money: 40000,
        },
        kelelawar: {
            money: 40000,
        },
        landak: {
            money: 40000,
        },
        kangguru: {
            money: 40000,
        },
        trenggiling: {
            money: 40000,
        },
        badak: {
            money: 40000,
        },
        gajah: {
            money: 40000,
        }
    },
    pasarsell: {
        elang: {
            money: 25000
        },
        beruang: {
            money: 25000,
        },
        harimau: {
            money: 25000,
        },
        buaya: {
            money: 25000,
        },
        bebek: {
            money: 25000,
        },
        ayam: {
            money: 25000,
        },
        koala: {
            money: 25000,
        },
        zebra: {
            money: 25000,
        },
        sapi: {
            money: 25000,
        },
        babi: {
            money: 25000,
        },
        banteng: {
            money: 25000,
        },
        kerbau: {
            money: 25000,
        },
        kelinci: {
            money: 25000,
        },
        tupai: {
            money: 25000,
        },
        serigala: {
            money: 25000,
        },
        domba: {
            money: 25000,
        },
        kelelawar: {
            money: 25000,
        },
        landak: {
            money: 25000,
        },
        kangguru: {
            money: 25000,
        },
        trenggiling: {
            money: 25000,
        },
        badak: {
            money: 25000,
        },
        gajah: {
            money: 25000,
        }
    }
}

let jarspy = async (m, { conn, command, usedPrefix, args, text, isPrems }) => {
    let user = await db.users.get(m.sender)

    if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
    if (command.toLowerCase() == 'pasar') {
        let text = `
*🎏 Pasar*

Ingin menggunakan *Pasar*?
Ketik _/pasarbuy_ bila ingin membeli hewan!
Ketik _/pasarsell_ bila ingin menjual hewan!
`.trim()
        conn.reply(m.chat, text, m)
        return
    }

    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user))
    const info = `
Contoh pemakaian: *${usedPrefix}${command} trenggiling 1*
    
▢ Daftar Hewan: 
${Object.keys(listItems).map((v) => {
        let paymentMethod = Object.keys(listItems[v]).find(v => v in user)
        return `${global.rpg.emoticon(v)}${capitalizeFirstLetter(v)} | ${toSimple(listItems[v][paymentMethod])} ${global.rpg.emoticon(paymentMethod)}${capitalizeFirstLetter(paymentMethod)}`.trim()
    }).join('\n')}
`.trim()

    const item = (args[0] || '').toLowerCase()

    if (!listItems[item]) {
        return m.reply(info)
    }

    if (!args[1]) {
        m.reply(info)
        return
    }

    let total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1)) : 1) * ({"K":1e3,"M":1e6,"B":1e9,"T":1e12,"QA":1e15,"QI":1e18,"SX":1e21,"SP":1e24,"OC":1e27,"N":1e30,"DC":1e33,"UD":1e36,"DD":1e39,"TD":1e42,"QUA":1e45,"QUI":1e48, "SXD":1e51, "SPD":1e54, "OCD":1e57, "NOD":1e60, "VG":1e63}[args[1].toUpperCase().replace(/[^KMBTQAISXONDCUP]/g,'')] || 1);

    if (command.toLowerCase() == 'pasarbuy') {
        user = await db.users.get(m.sender)
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user)
        let previous = user[paymentMethod] * 1; // Simpan nilai uang sebelumnya
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) {
            return m.reply(`Kamu tidak memiliki cukup ${global.rpg.emoticon(paymentMethod)}${paymentMethod} untuk membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)}. Kamu memerlukan *${toSimple((listItems[item][paymentMethod] * total) - user[paymentMethod])}* ${paymentMethod} lagi untuk dapat membeli`)
        }
        // Mengurangi uang dan menambahkan item
        await db.users.update(m.sender, (user) => {
            user[paymentMethod] -= listItems[item][paymentMethod] * total
            user[item] += total
            user.lastshop = new Date() * 1
        })
        return m.reply(`Kamu telah membeli *${toSimple(total)}* ${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)}`)
    } else if (command.toLowerCase() == 'pasarsell') {
        let previous = user[item] * 1; // Simpan jumlah item sebelum penjualan
        if (isPrems && /all/i.test(args[1])) {
            total = user[item];
        }
        if (user[item] < total) {
            return m.reply(`Kamu tidak memiliki cukup *${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)}* untuk dijual. Anda hanya memiliki ${toSimple(user[item])} item`)
        }
        const reward = listItems[item]
        if (Object.keys(reward).length > 1) {
            throw new Error('Banyak hadiah belum didukung')
        }
        const rewardKey = Object.keys(reward)[0]
        if (!(rewardKey in user)) {
            throw new Error(`Pengguna tidak memiliki ${rewardKey} dalam database mereka, tetapi hadiah memberikannya!`)
        }
        // Mengurangi item dan menambahkan hadiah
        await db.users.update(m.sender, (user) => {
            user[item] -= total
            user[rewardKey] += listItems[item][rewardKey] * total
            user.lastshop = new Date() * 1
        })
        return m.reply(`Kamu telah menjual *${toSimple(total)}* ${global.rpg.emoticon(item)}${capitalizeFirstLetter(item)} dan mendapatkan *${toSimple(listItems[item][rewardKey] * total)}* ${global.rpg.emoticon(rewardKey)}`)
    }
}

jarspy.help = ['pasar']
jarspy.tags = ['rpg']
jarspy.command = /^(pasar|pasarbuy|pasarsell)$/i

jarspy.disabled = false

export default jarspy

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

function toSimple(number) {
    if (isNaN(parseFloat(number))) return number
    if (parseFloat(number) === 0) return '0'
    number = parseFloat(number).toFixed(0)
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'N', 'Dc', 'Ud', 'Dd', 'Td', 'Qua', 'Qui', 'Sxd', 'Spd', 'Ocd', 'NoD', 'Vg']
    const base = 1000
    const exponent = Math.floor(Math.log10(Math.abs(number)) / 3)
    const suffix = suffixes[exponent] || ''
    const simplified = number / Math.pow(base, exponent)
    const formatter = Intl.NumberFormat('en', { maximumFractionDigits: 1 })
    return formatter.format(simplified) + suffix
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
