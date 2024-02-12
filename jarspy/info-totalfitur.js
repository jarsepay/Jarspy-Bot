/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import { jarspy } from '../lib/jarspy.js'

let jarsepay = async (m, { conn, args, command }) => {
let fiturye = Object.values(jarspy).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
let totalf = Object.values(jarspy).filter(
    (v) => v.help && v.tags
  ).length;
 conn.reply(m.chat, `Total Fitur ${namabot}: ${fiturye.length}`, m)

}
jarsepay.help = ['totalfitur']
jarsepay.tags = ['info']
jarsepay.command = ['totalfitur']
export default jarsepay