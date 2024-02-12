let jarspy = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `⌕ Contoh: ${usedPrefix}${command} i'm alien?`
    m.reply(`"${[
        'Mungkin suatu hari',
        'Tidak juga',
        'Tidak keduanya',
        'Kurasa tidak',
        'Ya',
        'Coba tanya lagi',
        'Tidak ada'
    ].getRandom()}."`)
}
jarspy.help = ['kerang', 'kerangajaib']
jarspy.tags = ['fun']

jarspy.command = /^(kulit)?kerang(ajaib)?$/i

export default jarspy