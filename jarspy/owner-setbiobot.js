let jarspy = async (m, { conn, text }) => {
    if (!text) throw `Masukkan teks untuk bio baru ${global.sh}` 
      try { 
                 await conn.updateProfileStatus(text).catch(_ => _) 
                 conn.reply(m.chat, 'Sukses Mengganti Bio Bot', m) 
 } catch { 
        throw 'Terjadi Kesalahan' 
      } 
}
jarspy.help = ['setbotbio'] 
jarspy.tags = ['owner'] 
jarspy.command = /^setb(io(bot)?|otbio)$/i 
  
export default jarspy