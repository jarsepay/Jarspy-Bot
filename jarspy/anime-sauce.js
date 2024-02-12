import axios from "axios";
import FormData from "form-data";

let jarspy = async (m, { conn, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `Reply foto fanart yang mau di cari sumber`;
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
  let img = await q.download();

  const formData = new FormData();
  formData.append("output_type", "2");
  formData.append("api_key", "58eb687f35decd24507ada808a643fb719931c18");
  formData.append("file", img, "image.jpg");

  await m.react('🕑');
  let res = await axios.post("https://saucenao.com/search.php", formData, {
    headers: formData.getHeaders(),
  });

  let json = res.data;

  if (!json.results || json.results.length === 0) {
    throw "Tidak ada hasil yang ditemukan.";
  }

  let result = json.results[0];
  let similarity = result.header.similarity;
  let imageUrl = result.header.thumbnail;

  let { title, author_name, ext_urls } = result.data;

  let _result = `*Judul :* ${title}\n*Author :* ${author_name}\n*Kesamaan :* ${similarity}%\n*Sumber :* ${ext_urls[0]}`;

  await conn.sendFile(m.chat, imageUrl, "result.jpg", _result, m);
};

jarspy.help = ["sauce"].map(v => v + '')
jarspy.tags = ["anime"];
jarspy.command = /^(sauce)$/i;
jarspy.limit = 5;
export default jarspy;