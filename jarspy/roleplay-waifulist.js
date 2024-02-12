/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

var jarspy = async (m, { args, text, conn, usedPrefix, command }) => {
	if (!text)
		return conn.reply(m.chat, `Contoh pemakaian: ${usedPrefix}${command} 5

✧ Daftar ini digunakan untuk pengguna yang ingin mengatur waifu melalui perintah */set waifu*. Kamu dapat melihat daftar waifu yang sudah kami sediakan dibawah ini

Berikut adalah daftar waifu yang tersedia berdasarkan kategori/judul

1. Favorit
2. Black Clover
3. Chuunibyou Demo Koi Ga Shitai
4. Date A Live
5. Genshin Impact
6. Gintama
7. Gotoubun no Hanayome
8. Kaguya Sama Love is War
9. Kanojo Okarishimasu
10. Konosuba
11. My Dress Up Darling
12. Nisekoi
13. Oregairu
14. Oshi no Ko
15. Rakudai Kishi no Cavalry
16. Rascal Does Not Dream
17. Sword Art Online
18. Tensei Shitara Slime
19. Yamada-kun to Lv999

Sumber: myanimelist.net`, m)

	if (text.toLowerCase() === "1") {
		conn.reply(
			m.chat, `*Daftar Waifu Favorit*

1. Aki Adagaki
2. Cecilia			
3. Chizuru Tachibana
4. Elaina
5. Izumi Sagiri
6. Kanna Kamui
7. Kaori Miyazono
8. Kyouko Hori
9. Makima
10. Mitama Chan
11. Miyako Shikimori
12. Nagisa Kubo
13. Nanako Kogure
14. Nobara Kugisaki
15. Roxy Migurdia
16. Shinobu Oshino
17. Shiori Katase
18. Ume Kurumizawa
19. YoRHa 2B
20. Yor Forger
21. Yotsuya Miko
22. Zero Two

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "2") {
		conn.reply(
			m.chat, `*Black Clover*

1. Nero

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "3") {
		conn.reply(
			m.chat, `*Chuunibyou Demo Koi Ga Shitai*
				
1. Rikka Takanashi
2. Sanae Dekomori
3. Shinka Nibutani
4. Satone Shichimiya

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "4") {
		conn.reply(
			m.chat, `*Date A Live*
				
1. Itsuka Kotori
2. Mana Takamiya
3. Miku Izayoi
4. Mio Takamiya
5. Tobiichi Origami
6. Tohka Yatogami
7. Tokisaki Kurumi
8. Yoshino Himekawa

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "5") {
		conn.reply(
			m.chat, `*Genshin Impact*
				
1. Eula
2. Ganyu
3. Hutao
4. Kamisato Ayaka
5. Kujou Sara
6. Nahida
7. Nilou
8. Raiden Shogun
9. Sangonomiya Kokomi
10. Yae Miko

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "6") {
		conn.reply(
			m.chat, `*Gintama*
				
1. Kagura Yato
2. Sarutobi Ayame
3. Shimura Tae
4. Tsukuyo

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "7") {
		conn.reply(
			m.chat, `*Gotoubun no Hanayome*
				
1. Nakano Ichika
2. Nakano Itsuki
3. Nakano Miku
4. Nakano Nino
5. Nakano Yotsuba

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "8") {
		conn.reply(
			m.chat, `*Kaguya Sama Love is War*
				
1. Shinomiya Kaguya
2. Fujiwara Chika
3. Hayasaka Ai
4. Shirogane Kei

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "9") {
		conn.reply(
			m.chat, `*Kanojo, Okarishimasu*
				
1. Ichinose Chizuru
2. Mami Nanami
3. Sumi Sakurasawa
4. Ruka Sarashina

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "10") {
		conn.reply(
			m.chat, `*Konosuba*
				
1. Megumin

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "11") {
		conn.reply(
			m.chat, `*My Dress-Up Darling*
				
1. Marin Kitagawa
2. Inui Sajuna
3. Shinju Inui

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "12") {
		conn.reply(
			m.chat, `*Nisekoi*
				
1. Chitoge Kirisaki
2. Kosaki Onodera

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "13") {
		conn.reply(
			m.chat, `*Oregairu*
				
1. Iroha Isshiki
2. Shizuka Hiratsuka
3. Yui Yuigahama
4. Yukino Yukinoshita

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "14") {
		conn.reply(
			m.chat, `*Oshi no Ko*
				
1. Ai Hoshino
2. Akane Kurokawa
3. Kana Arima
4. Ruby Hoshino

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "15") {
		conn.reply(
			m.chat, `*Rakudai Kishi no Cavalry*
				
1. Ayase Ayatsuji
2. Shizuku Kurogane
3. Stella Vermillion
4. Touka Toudou

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "16") {
		conn.reply(
			m.chat, `*Rascal Does Not Dream*
				
1. Kaede Azusagawa
2. Mai Sakurajima
3. Nodoka Toyohama
4. Rio Futaba
5. Shoko Makinohara
6. Tomoe Koga

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "17") {
		conn.reply(
			m.chat, `*Sword Art Online*
				
1. Asuna Yuuki
2. Ayano Keiko
3. Shino Asada
4. Shinozaki Rika
5. Suguha Kirigaya

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "18") {
		conn.reply(
			m.chat, `*Tensei Shitara Slime*
				
1. Milim Nava
2. Rimuru Tempest
3. Shizue Izawa
5. Shuna

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  } else if (text.toLowerCase() === "19") {
		conn.reply(
			m.chat, `*Yamada-kun to Lv999*
				
1. Akane Kinoshita
2. Runa Sasaki

Gunakan perintah */set waifu <nama waifunya>* jika kamu ingin memilih salah satu waifu dikategori ini.`, m)

  }
  
};
jarspy.help = ["waifulist"];
jarspy.tags = ["roleplay"];
jarspy.command = /^waifulist$/i;

export default jarspy