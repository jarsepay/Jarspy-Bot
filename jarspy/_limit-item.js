/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import db from '../lib/database/index.js'

export async function all(m) {
    let user = await db.users.get(m.sender)

    if (user) {
    let followers = Object.entries(await db.users.get()).filter(([key, data]) => (data.following || []).includes(m.sender)).map(([key, data]) => key)
        await db.users.update(m.sender, (user) => {
            user.followers = followers.length
        });
        
        if (!m.message)
            return
              
        if (user.luck > 100) {
            await db.users.update(m.sender, (user) => {
                user.luck = 100
            });
        }
        
        if (user.health > 200) {
            await db.users.update(m.sender, (user) => {
                user.health = 200
            });
        }

        if (user.kepercayaanwaifu > 500) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanwaifu = 500
            });
        }
        
        if (user.kepercayaanhusbu > 500) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanhusbu = 500
            });
        }
        
        if (user.kepercayaanwaifu <= 0) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanwaifu = 0
            });
        }
        
        if (user.kepercayaanhusbu <= 0) {
            await db.users.update(m.sender, (user) => {
                user.kepercayaanhusbu = 0
            });
        }
        
        if (user.jobexp > 50000) {
            await db.users.update(m.sender, (user) => {
                user.jobexp = 50000
            });
        }
        
        if (user.maxcrate > 50) {
            await db.users.update(m.sender, (user) => {
                user.maxcrate = 50
            });
        }
        
        if (user.telephone > 1000) {
            await db.users.update(m.sender, (user) => {
                user.telephone = 1000
            });
        }
        
        if (user.smartphone > 1000) {
            await db.users.update(m.sender, (user) => {
                user.smartphone = 1000
            });
        }
        
        const items = [
            'money', 'coinly', 'potion', 'keping', 
            'sphere', 'elixir', 'trash', 'wood',
            'rock', 'string', 'pet', 'iron',
            'gold', 'diamond', 'emerald', 'orb',
            'uncommon', 'common', 'rare', 'mythical', 'legendary', 'ancient',
            'car', 'fuel', 'crypto', 'ducky', 'auricore',
            'telephone', 'smartphone',
            'kentang', 'burger', 'pizza',
            'gems',
            'ironore', 'goldore', 'diamondore', 'ancientdebris', 'pickaxe', 
        ]

        if (user.health <= 0) {
            for (let i = 0; i < items.length; i++) {
                await db.users.update(m.sender, (user) => {
                    user[items[i]] = Math.floor(user[items[i]] * 8 / 10)
                });
            }
            await db.users.update(m.sender, (user) => {
                user.health = 10
                user.death += 1
            });
            m.reply('Kamu sakaratul maut dan meninggal\nMeregenerasi health kembali...')
        }

        if (!(new Date() - user.lastluck < 3600000) && (user.luck > 0) && (user.luck <= 10)) {
            await db.users.update(m.sender, (user) => {
                user.luck -= 1
            });
        }

        if ((+new Date() + 21 * 24 * 60 * 60 * 1000) < user.lasteat) {
            await db.users.update(m.sender, (user) => {
                user.lasteat = +new Date() + 21 * 24 * 60 * 60 * 1000
            });
        }

        if ((+new Date() >= user.lasteat) && (user.level > 10)) {
            for (let i = 0; i < items.length; i++) {
                await db.users.update(m.sender, (user) => {
                    user[items[i]] = Math.floor(user[items[i]] * 1 / 10)
                });
            }
            await db.users.update(m.sender, (user) => {
                user.health = 10
                user.death += 1
                user.lasteat = +new Date() + 7 * 24 * 60 * 60 * 1000
            });
            m.reply('Kamu mati kelaparan dan meninggal')
        }

        if (user.location === 'gubuk') {
            await db.users.update(m.sender, (user) => {
                user.strength_multiplier_extra = 1
                user.defense_multiplier_extra = 1
                user.psychic_multiplier_extra = 1
                user.speed_multiplier_extra = 1
            });
        }
    }
}