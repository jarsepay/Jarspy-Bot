/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js';

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
  let user = await db.users.get(m.sender);
  if (user.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*'
      return
    }
  let lowerCase = command.toLowerCase();

  if ((['quest', 'q'].includes(lowerCase)) && (user.quest == 0)) {
    let text = `
Selamat datang di Quest 🪖!
Di sini kamu akan diberi tugas - tugas untuk mendapatkan hadiah 🎁

Siap melaksanakan Quest?
Ketik "/questyes" bila iya ✅
Ketik "/questno" bila tidak ❌
`.trim();
    let quest = 'https://telegra.ph/file/da592b547a2925320400e.jpg';
    conn.sendFile(m.chat, quest, quest, text, m);
  }
  
  else if (command.toLowerCase() == 'questno') {
    conn.reply(m.chat, `Quest Dibatalkan`, m);
  }
  
  else if ((command.toLowerCase() == 'questyes') && (user.quest == 0) || (user.quest == 1) && (['quest', 'q'].includes(lowerCase))) {
    if (user.quest == 0) {
      await db.users.update(m.sender, (user) => {
        user.quest_previous = user.strength;
        user.quest = 1;
      });
    }
    
    let questselesai = '(Ketik /punch untuk mendapatkan 💪🏻 Strength)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest2 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 1:
Raihlah 20 💪🏻 Strength!

💈 Progress -> ${user.strength - user.quest_previous}/20 💪🏻 Strength!
🎁 Prize ▶️ 50 💵 Money!

${questselesai}
`.trim();

    if ((user.strength - user.quest_previous) < 20) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.strength - user.quest_previous) >= 20) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest2') && (user.quest == 1) && (user.questselesai == true)) || ((user.quest == 2) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 1) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.defense;
        user.quest = 2;
        user.money += 50;
      });
      conn.reply(m.chat, '🎁 Prize: 50 💵 Money!', m);
    }
    
    let questselesai = '(Ketik /train untuk mendapatkan 🛡️ Defense)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest3 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 2:
Raihlah 50 🛡️ Defense!

💈 Progress -> ${user.defense - user.quest_previous}/50 🛡️ Defense!
🎁 Prize ▶️ 30 🤳🏿 Click!

${questselesai}
`.trim();

    if ((user.defense - user.quest_previous) < 50) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.defense - user.quest_previous) >= 50) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest3') && (user.quest == 2) && (user.questselesai == true)) || ((user.quest == 3) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 2) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.psychic;
        user.quest = 3;
        user.click += 30;
      });
      conn.reply(m.chat, '🎁 Prize: 30 🤳🏿 Click!', m);
    }
    
    let questselesai = '(Ketik /pray untuk mendapatkan 🍃 Psychic)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest4 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 3:
Raihlah 15 🍃 Psychic!

💈 Progress -> ${user.psychic - user.quest_previous}/15 🍃 Psychic!
🎁 Prize ▶️ 5 🚙 Car!

${questselesai}
`.trim();

    if ((user.psychic - user.quest_previous) < 15) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.psychic - user.quest_previous) >= 15) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest4') && (user.quest == 3) && (user.questselesai == true)) || ((user.quest == 4) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 3) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.clickly;
        user.quest = 4;
        user.car += 5;
      });
      conn.reply(m.chat, '🎁 Prize: 5 🚙 Car!', m);
    }
    
    let questselesai = '(Ketik /click untuk mendapatkan 🤳🏿 Click)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest5 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 4:
Raihlah 3000 🤳🏿 Click!

💈 Progress -> ${user.clickly - user.quest_previous}/3000 🤳🏿 Click!
🎁 Prize ▶️ 1 🗡️ Sword!

${questselesai}
`.trim();

    if ((user.click - user.quest_previous) < 3000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.click - user.quest_previous) >= 3000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest5') && (user.quest == 4) && (user.questselesai == true)) || ((user.quest == 5) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 4) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.strength;
        user.quest = 5;
        user.sword += 1;
      });
      conn.reply(m.chat, '🎁 Prize: 1 🗡️ Sword!', m);
    }
    
    let questselesai = '(Ketik /punch untuk mendapatkan 💪🏻 Strength)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest6 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 5:
Raihlah 1500 💪🏻 Strength!

💈 Progress -> ${user.strength - user.quest_previous}/1500 💪🏻 Strength!
🎁 Prize ▶️Berpindah ke Las Vegas!

${questselesai}
`.trim();

    if ((user.strength - user.quest_previous) < 1500) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.strength - user.quest_previous) >= 1500) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest6') && (user.quest == 5) && (user.questselesai == true)) || ((user.quest == 6) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 5) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.steal;
        user.quest = 6;
        user.location = 'las vegas';
      });
      conn.reply(m.chat, '🎁 Prize: Berpindah ke Las Vegas!', m);
    }
    
    let questselesai = '(Ketik /steal untuk mendapatkan 💰 Steal)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest7 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 6:
Raihlah 10 💰 Steal!

💈 Progress -> ${user.steal - user.quest_previous}/10 💰 Steal!
🎁 Prize ▶️ 3 🗝️ lockpick!

${questselesai}
`.trim();

    if ((user.steal - user.quest_previous) < 10) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.steal - user.quest_previous) >= 10) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest7') && (user.quest == 6) && (user.questselesai == true)) || ((user.quest == 7) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 6) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.psychic;
        user.quest = 7;
        user.lockpick += 3;
      });
      conn.reply(m.chat, '🎁 Prize: 3 🗝️ Lockpick!', m);
    }
    
    let questselesai = '(Ketik /pray untuk mendapatkan 🍃 Psychic)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest8 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 7:
Raihlah 1000 🍃 Psychic!

💈 Progress -> ${user.psychic - user.quest_previous}/1000 🍃 Psychic!
🎁 Prize ▶️ 1 ⚖️ Balancer!

${questselesai}
`.trim();

    if ((user.psychic - user.quest_previous) < 1000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.psychic - user.quest_previous) >= 1000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest8') && (user.quest == 7) && (user.questselesai == true)) || ((user.quest == 8) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 7) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.psychic;
        user.quest = 8;
        user.balancer += 1;
      });
      conn.reply(m.chat, '🎁 Prize: 1 ⚖️ Balancer!', m);
    }
    
    let questselesai = '(Ketik /pray untuk mendapatkan 🍃 Psychic)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest9 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 8:
Raihlah 3500 🍃 Psychic!

💈 Progress -> ${user.psychic - user.quest_previous}/3500 🍃 Psychic!
🎁 Prize ▶️ 3 ⚖️ Balancer!

${questselesai}
`.trim();

    if ((user.psychic - user.quest_previous) < 3500) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.psychic - user.quest_previous) >= 3500) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
  
  else if (((command.toLowerCase() == 'quest9') && (user.quest == 8) && (user.questselesai == true)) || ((user.quest == 9) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 8) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.strength;
        user.quest = 9;
        user.balancer += 3;
      });
      conn.reply(m.chat, '🎁 Prize: 3 ⚖️ Balancer!', m);
    }
    
    let questselesai = '(Ketik /punch untuk mendapatkan 💪🏻 Strength)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest10 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 9:
Raihlah 1M 💪🏻 Strength!

💈 Progress -> ${toSimple(user.strength - user.quest_previous)}/1M 💪🏻 Strength!
🎁 Prize ▶️ 1K 🔱 Auricore!

${questselesai}
`.trim();

    if ((user.strength - user.quest_previous) < 1000000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.strength - user.quest_previous) >= 1000000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
    
    else if (((command.toLowerCase() == 'quest10') && (user.quest == 9) && (user.questselesai == true)) || ((user.quest == 10) && (['quest', 'q'].includes(lowerCase)))) {
    if (user.quest == 9) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
        user.quest_previous = user.defense;
        user.quest = 10;
        user.auricore += 1000;
      });
      conn.reply(m.chat, '🎁 Prize: 1K 🔱 Auricore!', m);
    }
    
    let questselesai = '(Ketik /train untuk mendapatkan 🛡️ Defense)';
    if (user.questselesai == true) {
      questselesai = '✅ ketik /quest11 untuk melanjutkan quest';
    }
    
    let text = `
⚔️ Quest 10:
Raihlah 2M 🛡️ Defense!

💈 Progress -> ${toSimple(user.defense - user.quest_previous)}/2M 🛡️ Defense!
🎁 Prize ▶️ 2 📱 Smartphone!

${questselesai}
`.trim();

    if ((user.defense - user.quest_previous) < 2000000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = false;
      });
      conn.reply(m.chat, text, m);
    } else if ((user.defense - user.quest_previous) >= 2000000) {
      await db.users.update(m.sender, (user) => {
        user.questselesai = true;
      });
      conn.reply(m.chat, text, m);
    }
  }
    
}

jarspy.help = ['quest'];
jarspy.tags = ['rpg'];
jarspy.command = /^q|quest|quest(yes|no|1|2|3|4|5|6|7|8|9|10)/i;

export default jarspy;

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