/*
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

import ytdl from "ytdl-core"
import fs from "fs"
import ffmpeg from "fluent-ffmpeg"
import search from "yt-search"

let jarspy = async (m, { conn, command, usedPrefix, text }) => {
  if (!text) return m.reply(`Contoh pemakaian: ${usedPrefix + command} Highest`)
  await m.react('🕑')
  try {
    let results = await search(text)
    let videoId = results.videos[0].videoId
    let info = await ytdl.getInfo(videoId)
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, "")
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    let url = info.videoDetails.video_url
    let duration = parseInt(info.videoDetails.lengthSeconds)
    let uploadDate = new Date(
      info.videoDetails.publishDate
    ).toLocaleDateString()
    let views = info.videoDetails.viewCount
    let minutes = Math.floor(duration / 60)
    let description = results.videos[0].description
    let seconds = duration % 60
    let durationText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    let audio = ytdl(videoId, { quality: "highestaudio" })
    let inputFilePath = "./tmp/" + title + ".webm"
    let outputFilePath = "./tmp/" + title + ".mp3"
    let viewsFormatted = formatViews(views);
    let infoText = `◦ *Judul*: ${title}\n◦ *Durasi*: ${durationText}\n◦ *Upload*: ${uploadDate}\n◦ *Views*: ${viewsFormatted}\n◦ *ID*: ${videoId}\n◦ *Deskripsi*: ${description}\n◦ *URL*: ${url}\n\nJika audio tidak terkirim, silahkan gunakan *${usedPrefix}ytmp3* atau *${usedPrefix}ytmp4* menggunakan Link URL diatas.`
    const pesan = conn.relayMessage(
      m.chat,
      {
        extendedTextMessage: {
          text: infoText,
          contextInfo: {
            externalAdReply: {
              title: "Y O U T U B E - P L A Y",
              body: "Audio sedang dalam pengiriman...",
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnailUrl: thumbnailUrl,
              sourceUrl: url
            }
          },
          mentions: [m.sender]
        }
      },
      {}
    )

    audio.pipe(fs.createWriteStream(inputFilePath)).on("finish", async () => {
      ffmpeg(inputFilePath)
        .toFormat("mp3")
        .on("end", async () => {
          let buffer = fs.readFileSync(outputFilePath)
          conn.sendMessage(
            m.chat,
            {
              audio: buffer,
              mimetype: "audio/mpeg",
              contextInfo: {
                externalAdReply: {
                  title: title,
                  body: "",
                  thumbnailUrl: thumbnailUrl,
                  sourceUrl: url,
                  mediaType: 1,
                  showAdAttribution: true,
                  renderLargerThumbnail: true
                }
              }
            },
            {
              quoted: m
            }
          )
          fs.unlinkSync(inputFilePath)
          fs.unlinkSync(outputFilePath)
        })
        .on("error", err => {
          console.log(err)
          m.reply(`Error: ${err.message}`)
          fs.unlinkSync(inputFilePath)
          fs.unlinkSync(outputFilePath)
        })
        .save(outputFilePath)
    });
  } catch (e) {
    console.log(e)
    m.reply(`Error: ${e.message}`)
  }
};

jarspy.help = ["play"]
jarspy.tags = ["youtube"]
jarspy.command = /^(play)$/i
jarspy.limit = 8

export default jarspy

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M"
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K"
  } else {
    return views.toString()
  }
}