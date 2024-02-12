/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

let confirm = {}

async function jarspy(m, { conn, args }) {
    if (m.sender in confirm) throw 'Kamu masih melakukan judi, tunggu sampai selesai!!'
    try {
        let user = await db.users.get(m.sender)
        
        if (user.location !== 'las vegas') {
    m.reply('Kamu harus berada di Las Vegas untuk berjudi! Pindah ke Las Vegas dengan */pindah* atau selesaikan Quest 5');
    return;
  }
  
        if (user.safezone == true) return m.reply(`Kamu tidak dapat berjudi bila sedang berada di zona aman`)
        
        let count = (args[0] && !isNaN(args[0]) ? parseInt(args[0]) : (/^\D+$/.test(args[0]) && !/all/i.test(args[0])) ? 1 : args[0].replace('-', '').toUpperCase().replace(/all/i, user.money).replace(/(\d*\.?\d*)([A-Z]+)/g, (_,n,p)=>parseFloat(n)*({K:1e3,M:1e6,B:1e9,T:1e12,QA:1e15,QI:1e18,SX:1e21,SP:1e24,OC:1e27,N:1e30,DC:1e33,UD:1e36,DD:1e39,TD:1e42,QUA:1e45,QUI:1e48,SXD:1e51,SPD:1e54,OCD:1e57,NOD:1e60,VG:1e63}[p] || 1)) || 1);
        count = isNaN(count) ? 1 : count;
        if (count > 999e63 || count < 0) {
            return m.reply(`Error`);
        }
        
        if ((user.money * 1) < count) return m.reply('Uang kamu tidak cukup')
        if (!(m.sender in confirm)) {
            confirm[m.sender] = {
                sender: m.sender,
                count,
                timeout: setTimeout(() => (m.reply('timed out'), delete confirm[m.sender]), 60000)
            }
            let txt = `⚠️ Warning ⚠️ | 🪿 Jumlah Bet: ${toSimple(count)} 💵\n*Apakah anda yakin mau melakukan judi?* (60s Timeout)\nKetik "y" untuk iya ✅ dan "n" ❌ untuk tidak!`
            return conn.reply(m.chat, txt, m)
            //return conn.sendButton(m.chat, txt, author, null, [['✅'], ['❌']], m)
        }
    } catch (e) {
        console.error(e)
        if (m.sender in confirm) {
            let { timeout } = confirm[m.sender]
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Rejected')
        }
    }
}

jarspy.before = async m => {
    if (!(m.sender in confirm)) return
    if (m.isBaileys) return
    let { timeout, count } = confirm[m.sender]
    let user = await db.users.get(m.sender)
    let moneyDulu = user.money * 1
    let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase()
    try {
        if (/^yes|ya|y|✅$/i.test(txt)) {
            let Bot = (Math.ceil(Math.random() * 100)) * 1
            let Kamu = (Math.floor(Math.random() * 80)) * 1
            let status = 'Kalah'
            if (Bot < Kamu) {
                await db.users.update(m.sender, (user) => {
                    user.money += count * 1
                });
                status = 'Menang'
            } else if (Bot > Kamu) {
                await db.users.update(m.sender, (user) => {
                    user.money -= count * 1
                });
            } else {
                status = 'Seri'
            }
            m.reply(`
Bot roll: *${Bot}*
Kamu roll: *${Kamu}*

Kamu *${status}*, kamu ${status == 'Menang' ? `Mendapatkan *+${toSimple(count * 2)}*` : status == 'Kalah' ? `Kehilangan *-${toSimple(count * 1)}*` : `Mendapatkan *+${count * 0}*`} 💵 Money
    `.trim())
            clearTimeout(timeout)
            delete confirm[m.sender]
            return !0
        } else if (/^no|tidak|n|❌$/i.test(txt)) {
            clearTimeout(timeout)
            delete confirm[m.sender]
            m.reply('Judi tercancel! ❌')
            return !0
        }

    } catch (e) {
        clearTimeout(timeout)
        delete confirm[m.sender]
        if (moneyDulu > (user.money * 1)) {
            await db.users.update(m.sender, (user) => {
                user.money = moneyDulu * 1
            });
        }
        m.reply('Error saat melakukan judi (Rejected)')
        return !0
    } finally {
        clearTimeout(timeout)
        delete confirm[m.sender]
        return !0
    }
}

jarspy.help = ['judi']
jarspy.tags = ['rpg']
jarspy.command = /^(judi|bet)$/i

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
