/*
  • By Malik
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "https://api.kome.ai",
  headers: {
    "Content-Type": "application/json",
    "Referer": "https://api.kome.ai"
  }
});

const youtubeTranscript = async (videoId) => {
  try {
    const response = await apiInstance.post("/api/tools/youtube-transcripts", {
      video_id: videoId,
      format: true
    });

    if (response.data.transcript === undefined) {
      throw "Transkrip tidak ditemukan";
      return
    }

    return response.data.transcript;
  } catch (error) {
    m.reply("Error: " + error.message);
  }
};

let jarspy = async (m, { args, conn, text }) => {
  const quot = m.quoted ? m.quoted : m;
  const q = text ? text : quot.text;
  
  if (!args[0]) throw "Masukkan url dari youtube" 

  if (!args[0].match(/youtu/gi)) {
  throw 'Pastikan bahwa link benar-benar berasal dari youtube'
  return
  }
  await m.react('🕑')
  
  try {
    const transcribe = await youtubeTranscript(text);
    await m.reply(transcribe);
  } catch (error) {
    conn.reply(m.chat, "Error: " + error.message, m);
  }
};

jarspy.help = ['transkrip'];
jarspy.tags = ['youtube'];
jarspy.command = /^(transkrip|transcript|transcriptsyt|transcriptsyoutube|transkripyt|transkripyoutube)$/i;

export default jarspy;