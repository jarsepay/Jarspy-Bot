/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

let cooldown = isPrems => isPrems ? 900000 : 3600000;

let jarspy = async (m, { isPrems, conn, usedPrefix, args, text }) => {
    let user = await db.users.get(m.sender);
    if (user.jail === true) {
        throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*';
    }
    let count = text
    let timers = cooldown - (new Date() - user.lasttrading);
    if (user.job === 'trader') {
        if (new Date() - user.lasttrading <= cooldown) {
            return m.reply(`
Kamu sudah melakukan trading. Silakan tunggu selama *🕐${timers.toTimeString()}*
`.trim());
        }
        if (user.health < 20) {
            return m.reply(`Untuk trading, dibutuhkan sedikitnya 20 darah!
Kamu bisa membeli darah ❤️ dengan mengetik *${usedPrefix}buy potion <jumlah>*, dan ketik *${usedPrefix}heal <jumlah>* untuk menggunakan potion! atau panggil dokter
`.trim());
        }

        let minimal_click = 100;
        if (count > 1000000000000) {
            minimal_click = 100 + Math.ceil((Math.ceil(Math.log10(count)) - 12) / 3) * 100;
        } else {
            minimal_click = 100;
        }

        if (user.coinly < minimal_click) {
            return m.reply(`
Untuk trading, dibutuhkan sedikitnya ${minimal_click} 🤳🏿 click!
Kamu bisa mendapatkan click 🤳🏿 dengan mengetik *${usedPrefix}click*
`.trim());
        }
        if (count < 100000000) {
            throw `Untuk trading, dibutuhkan sedikitnya 100 juta 💵 money! Ketik .trading 100000000 atau lebih sesuai budgetmu`;
        }
        if (user.money < count) {
            throw `Untuk trading, dibutuhkan sedikitnya ${count} 💵 Money! Ketik .trading 100000000 atau lebih sesuai budgetmu`;
        }
        if (user.trash > 1000) {
            throw `Kamu terlalu kotor untuk trading! Buang dulu sampahmu!`;
        }

        const rewards = reward(user, count, minimal_click);
        let text = 'Kamu telah trading dan kehilangan:';
        for (const lost in rewards.lost) {
            if (user[lost]) {
                const total = rewards.lost[lost].getRandom();
                await db.users.update(m.sender, (user) => {
                    user[lost] -= total * 1;
                });
                if (total) text += `\n*${global.rpg.emoticon(lost)}${lost}:* ${toSimple(total)}`;
            }
        }
        text += '\n\nHasil Trading:';
        for (const rewardItem in rewards.reward) {
            if (rewardItem in user) {
                const total = rewards.reward[rewardItem].getRandom();
                await db.users.update(m.sender, (user) => {
                    user[rewardItem] += total;
                });
                if (total) text += `\n*${global.rpg.emoticon(rewardItem)}${rewardItem}:* ${toSimple(total)}`;
            }
        }
        m.reply(text.trim());
        await db.users.update(m.sender, (user) => {
            user.lasttrading = new Date() * 1;
        });
    } else {
        return conn.reply(m.chat, 'Fitur ini hanya dikhususkan untuk orang yang bekerja sebagai trader', m);
    }
};

jarspy.help = ['trading'];
jarspy.tags = ['rpg'];
jarspy.command = /^(trading)$/i;
jarspy.cooldown = cooldown;
jarspy.disabled = false;

export default jarspy;

function reward(user = {}, count, minimal_coinly) {
    let rewards = {
        reward: {
            money: count * 8,
            exp: 3000,
            coinly: 30,
            rupiah: 500,
            gold: 50000 * count / 100000000,
            diamond: 4800 * count / 100000000,
            emerald: 140 * count / 100000000,
        },
        lost: {
            health: 101 - user.cat * 8,
            armordurability: (15 - user.armor) * 14,
            click: minimal_click,
            money: count,
        },
    };
    return rewards;
}

function number(x = 0) {
    x = parseInt(x);
    return !isNaN(x) && typeof x == 'number';
}

function isNumber(x) {
    return !isNaN(x);
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