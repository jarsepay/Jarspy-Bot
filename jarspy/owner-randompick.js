/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import fetch from 'node-fetch'

let toM = a => '@' + a.split('@')[0]
let jarspy = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    args,
    command
}) => {
let ps = groupMetadata.participants.map(v => v.id)
        let a = ps.getRandom()
        m.reply(`🥳 *${toM(a)} just won the giveaway!*`, null, {
            mentions: [a]
        })
}
jarspy.command = jarspy.help = ['randompick']
jarspy.tags = ['owner']
jarspy.owner = true

export default jarspy