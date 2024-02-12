import fetch from 'node-fetch';

let jarspy = async (m, { conn, command, usedPrefix, text }) => {
  if (!text) throw `Harap berikan judul film yang ingin dilihat detailnya. Contoh pemakaian: ${usedPrefix}${command} Ghost Town`;

  try {
    let res = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`);

    if (!res.ok) {
      throw new Error(`Permintaan API gagal dengan status ${res.status}`);
    }

    let json = await res.json();

    console.log('JSON response:', json);

    let ratings = json.ratings.map(rating => `• *${rating.source}:* ${rating.value}`).join('\n');

    let movieInfo = `*Movie Information:*\n
• *Title:* ${json.title}
• *Year:* ${json.year}
• *Rated:* ${json.rated}
• *Released:* ${json.released}
• *Runtime:* ${json.runtime}
• *Genres:* ${json.genres}\n
• *Director:* ${json.director}
• *Writer:* ${json.writer}
• *Actors:* ${json.actors}
• *Plot:* ${json.plot}\n
• *Languages:* ${json.languages}
• *Country:* ${json.country}
• *Awards:* ${json.awards}
• *Metascore:* ${json.metascore}
• *Rating:* ${json.rating}
• *Votes:* ${json.votes}\n
• *IMDB ID:* ${json.imdbid}
• *Type:* ${json.type}
• *DVD:* ${json.dvd}
• *Box Office:* ${json.boxoffice}
• *Production:* ${json.production}
• *Website:* ${json.website}\n\n
*Ratings:*\n${ratings}`;

    await conn.sendFile(m.chat, json.poster, 'poster.jpg', movieInfo, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Error: ${error}`, m)
  }
};

jarspy.help = ['imdb'];
jarspy.tags = ['internet'];
jarspy.command = /^(imdb)$/i;

export default jarspy;