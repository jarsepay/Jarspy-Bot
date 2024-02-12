let jarspy = async (m, { conn, usedPrefix, text, isROwner, isOwner }) => { 
   if (!text) throw `Contoh pemakaian: ${usedPrefix}setsubject ${namabot}`
   await conn.groupUpdateSubject(m.chat, text) 
  m.reply(`Nama grup telah diubah menjadi *${text ? `${text}*` : 'None'}`) 
} 
jarspy.help = ['setsubject'] 
jarspy.tags = ['group'] 
jarspy.command = /^(setsubject)$/i 
jarspy.botAdmin = true 
jarspy.group = true 
jarspy.admin = true 
export default jarspy