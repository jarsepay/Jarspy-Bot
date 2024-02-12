// Silahkan diubah, gw ikhlas kok bang

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
let donasi = `Cukup Kasih Star\n*https://github.com/jarsepay/Jarspy-Bot*`
conn.sendMessage(m.chat, {
     text: donasi,
     contextInfo: {
     externalAdReply: {
     showAdAttribution: true,
     title: wmtitle,
     body: wmbody,
     mediaType: 1,
     sourceUrl: sig,
     thumbnailUrl: thumbs,
     renderLargerThumbnail: true
     }}}, { quoted: m })
}
jarspy.help = ['donasi']
jarspy.tags = ['main']
jarspy.command = /^dona(te|si)$/i

export default jarspy