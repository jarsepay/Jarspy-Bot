const jarspy = async (m, { conn, text, usedPrefix, command }) => {
    let tqto = `
# Thanks to all. 
• Aaron (My leader)
• Neil. T (My Partner)
• Karl (Rdp)
• Kaleb (Missing Njir)
• Uniq (Idea)
• BochilGaming (Base)
• Whiskeysockets (Baileys)
• Tronyx (Optiklink)
• Mr.retslav (Retslav founder) & ibas (Helping fix bot connect)
• Lolhuman (Api)
• Erlan (Api menyala bosku🔥)
• Danz/DannTeam (Friend) (Helping me)
• Rehan El Staro (Friend) (Helping me)
• Manz Radit (Friend) (Hilang gatau kemana)
• Nayla (Friend) (Helping me)
• Malik & Komang
• ImYanXiao & Xnuvers007
• Jarsépay
• Dan semuanya, sorry kalau ga kesebut

≽ Owner Bot: ${namaowner} *[ wa.me/${nomorowner} ]*
≽ Recoder: Jarsépay *[ wa.me/6282148864989 ]*
≽ Grup Bot: *${sgc}*
`.trim()

    conn.reply(m.chat, tqto, m, {
      contextInfo: {
        externalAdReply: {
          title: `2024 © ${global.wmtitle}`,
          thumbnailUrl: thumbs,
          sourceUrl: 'https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}

jarspy.help = ['tqto']
jarspy.tags = ['info']
jarspy.command = /^(tqto|thanksto)/i

export default jarspy