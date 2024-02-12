let jarspy = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'buka': 'not_announcement',
        'tutup': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)
        throw `
*Format salah. Contoh :*
 ◦ ${usedPrefix + command} tutup
 ◦ ${usedPrefix + command} buka
`.trim()
    await conn.groupSettingUpdate(m.chat, isClose)
}
jarspy.help = ['grup']
jarspy.tags = ['group']
jarspy.command = /^(grup)$/i

jarspy.admin = true
jarspy.botAdmin = true

export default jarspy
