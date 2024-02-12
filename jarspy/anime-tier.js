var jarspy = async (m, { args, text, conn, usedPrefix, command }) => {
	if (!text)
		throw `Ketik : *${usedPrefix}${command} < 1 - 10 & Full>*
Contoh : *${usedPrefix}${command} 11*
`;
	if (args[0]?.toLowerCase() === "11") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 11: Sangat Kecil 」*
Tidak ada nilai joule yang tersedia. Tingkatan ini berkaitan dengan karakter yang dapat membuat / menghancurkan atau memengaruhi seluruh struktur alam semesta berdimensi lebih rendah, atau lapisan / level realitas yang lebih rendah. Harap dicatat bahwa yang ada sebagai gambar atau dibuat dari data / informasi tidak dapat diperingkat pada tingkatan ini, karena makhluk tersebut masih 3 dimensi, tetapi dalam skala yang sangat kecil.

#11-C: Tingkat Hypoverse Rendah
Karakter yang mendemonstrasikan kekuatan yang setara dengan menghancurkan / membuat konstruksi level 0-D dengan ukuran berapa pun, atau tiga level tak terhingga / derajat realitas / transendensi fiksi atau serupa di bawah realitas 3-D. Tingkatan ini juga mencakup karakter yang berada jauh di bawah level ini, dan semua karakter yang berada di bawah persyaratan tingkatan ini secara signifikan akan tetap berada di tingkatan ini.

#11-B: Tingkat hipoverse
Karakter yang menunjukkan kekuatan yang setara dengan menghancurkan / menciptakan konstruksi level 1-D yang secara eksistensial lebih rendah dari berbagai ukuran, atau dua tingkat tak terhingga / derajat realitas / transendensi fiksi atau serupa di bawah realitas 3-D.

#11-A: Tingkat Hypoverse Tinggi
Karakter yang menunjukkan kekuatan yang setara dengan menghancurkan / menciptakan konstruksi tingkat 2-D yang secara eksistensial lebih rendah dari berbagai ukuran, atau 1 tingkat tak terhingga / derajat realitas / transendensi fiksi atau serupa di bawah realitas 3-D.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "10") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 10: Manusia 」*
#10-C: Di Bawah Rata-Rata Tingkat Manusia
Karakter yang mampu mengerahkan kekuatan sebanding dengan manusia yang berada di bawah norma rata-rata dalam hal kekuatan, seperti anak kecil atau orang lemah, serta hewan yang lebih kecil seperti kucing dan anjing.

#10-B: Tingkat manusia
Karakter yang mampu mengerahkan kekuatan yang sebanding dengan manusia biasa, seperti remaja atau orang dewasa yang tidak atletis.

#10-A: Level atlet
Karakter yang mampu memberikan kekuatan yang sebanding dengan manusia yang lebih atletis, seperti petarung terlatih atau individu yang secara umum sehat secara fisik.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "9") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 9: Manusia Super 」*
#9-C: Tingkat jalanan
Karakter yang berdiri di ambang kekuatan dan kemampuan manusia, diwakili oleh atlet tingkat Olimpiade atau seniman bela diri yang terlatih dengan ketat, serta hewan yang lebih besar.

Penting untuk dicatat bahwa, meskipun dinamai "Street level", tingkat ini tidak ada hubungannya dengan benar-benar mempengaruhi keseluruhan jalan, dengan nama yang lebih mengacu pada pejuang jalanan seperti yang digambarkan dalam film seni bela diri dan sejenisnya.

#9-B: Tingkat dinding
Karakter yang dapat menghancurkan atau merusak secara signifikan bahan yang sangat tahan seperti batu, logam atau baja, serta bagian konstruksi yang tahan serupa seperti batu dan dinding struktural.

#9-A: Tingkat Bangunan Kecil
Karakter yang mampu menghancurkan ruangan atau seluruh bangunan kecil seperti rumah atau bangunan yang lebih sederhana.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "8") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 8: Perkotaan 」*
#8-C: Tingkat bangunan
Karakter yang dapat menghancurkan bangunan dan konstruksi berukuran sedang, seperti pabrik besar atau kompleks besar seperti supermarket.

#Tinggi 8-C: Tingkat Bangunan Besar
Karakter yang dapat menghancurkan bangunan besar seperti gedung pencakar langit.

#8-B: Tingkat Blok Kota
Karakter yang dapat menghancurkan blok kota kota atau area ruang yang setara.

#8-A: Level Blok Multi-Kota
Karakter yang dapat menghancurkan beberapa blok kota atau area ruang yang setara.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "7") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 7: Nuklir 」*
#Low 7-C: Tingkat Kota Kecil
Karakter yang dapat menghancurkan kota kecil atau pemukiman, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat kota kecil.

#7-C: Tingkat kota
Karakter yang dapat menghancurkan kota, atau yang dapat dengan mudah melukai karakter dengan daya tahan level kota.

#High 7-C: Tingkat Kota Besar
Karakter yang dapat menghancurkan kota besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan level kota besar.

#Low 7-B: Tingkat Kota Kecil
Karakter yang dapat menghancurkan kota kecil, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat kota kecil.

#7-B: Tingkat kota
Karakter / Senjata yang dapat menghancurkan kota, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat kota.

#7-A: Tingkat gunung
Karakter / Senjata yang dapat menghancurkan gunung, atau yang dapat dengan mudah melukai karakter dengan daya tahan level gunung.

#Tinggi 7-A: Tingkat Gunung Besar
Karakter yang dapat menghancurkan gunung besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat gunung yang besar.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "6") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 6: Tektonik 」*
#6-C: Tingkat pulau
Karakter / Senjata yang dapat menghancurkan pulau, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat pulau.

#High 6-C: Tingkat Pulau Besar
Karakter yang dapat menghancurkan pulau besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat pulau besar.

#Low 6-B: Tingkat Negara Kecil
Karakter yang dapat menghancurkan negara kecil, atau yang dapat dengan mudah melukai karakter dengan daya tahan level negara kecil.

#6-B: Tingkat negara
Karakter yang dapat menghancurkan negara, atau yang dapat dengan mudah melukai karakter dengan daya tahan level negara.

#High 6-B: Tingkat Negara Besar
Karakter yang dapat menghancurkan negara besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan level negara besar.

#6-A: Tingkat benua
Karakter yang bisa menghancurkan benua atau yang bisatidak membahayakan karakter dengan daya tahan tingkat benua.

#High 6-A: Tingkat Multi-Benua
Karakter yang dapat menghancurkan banyak benua atau yang dapat dengan mudah melukai karakter dengan daya tahan level multi-benua.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "5") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 5: Planet 」*
#5-C: Tingkat bulan
Karakter yang dapat menghancurkan bulan, atau objek astrologi dengan proporsi yang sama.

#Low 5-B: Tingkat Planet Kecil 
Karakter yang dapat menghancurkan planet kecil atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat planet kecil.

#5-B: Tingkat planet
Karakter yang dapat membuat / menghancurkan planet.

#5-A: Tingkat Planet Besar
Karakter yang dapat membuat / menghancurkan raksasa gas besar seperti Jupiter dan Saturnus.

#High 5-A: Level Bintang Dwarf
Karakter yang dapat membuat / menghancurkan bintang yang sangat kecil.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "4") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 4: Stellar 」*
#Low 4-C: Tingkat Bintang Kecil
Karakter yang dapat membuat / menghancurkan bintang kecil.

#4-C: Tingkat bintang
Karakter yang dapat membuat / menghancurkan bintang.

#High 4-C: Tingkat Bintang Besar
Karakter yang dapat membuat / menghancurkan bintang besar.

#4-B: Tingkat Tata Surya
Karakter yang dapat membuat / menghancurkan tata surya.

#4-A: Tingkat Multi-Tata Surya
Karakter yang dapat membuat / menghancurkan banyak tata surya.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "3") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 3: Kosmik 」*
#3-C: Tingkat galaksi
Karakter yang mampu menciptakan dan / atau menghancurkan galaksi, jika ruang antara benda-benda langit diperhitungkan, bukan hanya materi yang dicakupnya.

#3-B: Tingkat multi-Galaxy
Karakter yang mampu membuat dan / atau menghancurkan banyak galaksi jika ruang antar benda langit juga diperhitungkan.

#3-A: Tingkat alam semesta
Karakter yang secara signifikan dapat mempengaruhi, menciptakan dan / atau menghancurkan alam semesta setidaknya sebesar ukuran kita sendiri, tetapi tidak jauh lebih besar.

#High 3-A: Tingkat Alam Semesta Tinggi
Karakter yang mendemonstrasikan jumlah energi tak terhingga pada skala 3-D, atau mereka yang dapat memengaruhi area 3-D tak hingga atau jumlah tak hingga dari alam semesta hingga atau tak hingga saat tidak memperhitungkan dimensi atau waktu yang lebih tinggi, atau lebih umum lagi ranah apa pun dengan ukuran yang sebanding. Sejumlah besar alam semesta tak terbatas, kecuali saling tertutup secara kausal oleh ruangwaktu atau keberadaan terpisah, hanya dihitung untuk tingkat yang lebih tinggi dari tingkatan ini. Menjadi "tak terbatas" lebih kuat dari level ini, kecuali tidak terhitung, tidak memenuhi syarat untuk tingkatan yang lebih tinggi.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "2") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 2: Multiversal 」*
Low 2-C | Tingkat alam semesta +: Karakter yang mampu mempengaruhi secara signifikan, menciptakan dan / atau menghancurkan area ruang yang secara kualitatif lebih besar dari ruang 3 dimensi berukuran tak terhingga. Contoh ruang-waktu fiksi umum yang merepresentasikan ukuran seperti itu adalah kontinum ruang-waktu dalam skala universal. Namun, ini dapat secara lebih umum dipenuhi oleh ruang 4 dimensi apa pun yang:

A.) Setara dengan ruang dimensi ekstra besar. Artinya, ruang "massal" berdimensi lebih tinggi yang menyematkan ruang berdimensi lebih rendah (seperti alam semesta kita) sebagai himpunan bagian dari dirinya sendiri, yang dimensinya tidak mikroskopis / dipadatkan.

B.) Digambarkan sebagai objek dan ruang berdimensi rendah yang sepenuhnya melampaui latar dalam latar suatu karya fiksi.

#2-C | Level Multiverse Rendah: Karakter yang dapat mempengaruhi secara signifikan, membuat dan / atau menghancurkan multiverse kecil yang dapat terdiri dari beberapa kontinum ruang-waktu terpisah mulai dari dua hingga seribu, atau setara.

#2-B: Level multiverse
Karakter yang secara signifikan dapat mempengaruhi [1], membuat dan / atau menghancurkan multiverse yang lebih besar yang terdiri dari 1001 hingga jumlah terbatas yang lebih tinggi dari kontinum ruang-waktu terpisah.

#2-A: Level multiverse +
Karakter yang mampu mempengaruhi secara signifikan, membuat dan / atau menghancurkan kontinum ruang-waktu yang tak terhitung jumlahnya.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "1") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 1: Ekstradimensi 」*
Karakter yang secara signifikan dapat mempengaruhi ruang dengan ukuran yang secara kualitatif lebih besar daripada model dan ruang universal biasa, biasanya diwakili dalam fiksi oleh tingkat atau keadaan keberadaan yang lebih tinggi (Atau "tingkat ketidakterbatasan") yang meremehkan segala sesuatu di bawahnya menjadi tidak penting, biasanya oleh menganggapnya mirip dengan konstruksi fiksi atau sesuatu yang sangat kecil.

#Low 1-C | Level Multiverse Kompleks Rendah: Karakter yang dapat memengaruhi, membuat, dan / atau menghancurkan keseluruhan ruang yang ukurannya sesuai dengan satu hingga dua tingkat tak terhingga yang lebih tinggi daripada model universal standar (struktur 2-C rendah, dalam bahasa Inggris sederhana.) skala "dimensional", ini dapat disamakan dengan ruang koordinat nyata 5 dan 6 dimensi (R ^ 5 hingga R ^ 6)

#1-C | Level Multiverse Kompleks: Karakter yang dapat memengaruhi, membuat, dan / atau menghancurkan ruang yang ukurannya sesuai dengan tiga hingga lima level tak terhingga yang lebih tinggi lebih besar dari model universal standar. Dalam skala "dimensional", ini dapat disamakan dengan ruang koordinat nyata 7 dan 9 dimensi (R ^ 7 sampai R ^ 9)

#High 1-C | Level Multiverse Kompleks Tinggi: Karakter yang dapat memengaruhi, membuat, dan / atau menghancurkan ruang secara universal yang ukurannya sesuai dengan enam hingga tujuh tingkat tak terhingga yang lebih tinggi dari model universal standar. Dalam skala "dimensional", ini dapat disamakan dengan ruang koordinat nyata 10 dan 11-dimensi (R ^ 10 sampai R ^ 11)

#1-B | Level Hyperverse: Karakter yang dapat secara universal mempengaruhi, membuat dan / atau menghancurkan ruang yang ukurannya sesuai dari 8 hingga level tak terhingga yang lebih tinggi di atas model universal standar. Dalam hal ukuran "dimensional", ini dapat disamakan dengan ruang koordinat nyata 12 dimensi ke atas (R ^ 12 ke atas)

#High 1-B | Tingkat Hyperverse Tinggi: Karakter yang secara universal dapat mempengaruhi, membuat dan / atau menghancurkan struktur yang ukurannya setara dengan ukuran kualitatif yang tak terhitung jumlahnya di atas model universal, biasanya diwakili dalam fiksi oleh hierarki lapisan eksistensi yang tak ada habisnya, masing-masing menggantikan yang benar-benar meremehkan yang sebelumnya menjadi tidak penting, atau lebih umum lagi ruang dengan dimensi tak terhingga yang tak terhitung.

#1-A: Tingkat luar
Karakter yang secara fungsional melampaui sistem Tiering lainnya, dan berdiri di luar ekstensi hierarki dan ukuran tak terbatas, dengan berbagai derajat dan besaran. Dalam istilah yang lebih sederhana, kategori ini dapat dikatakan ditempati oleh karakter yang ukuran dan / atau level kekuatannya tidak dapat dicapai hanya dengan menumpuk infinitas yang lebih besar di atas satu sama lain.

#Low 1-A | Outerverse Rendah: Karakter yang dapat secara universal mempengaruhi, membuat dan / atau menghancurkan struktur dan bentangan dimensi tak terhingga yang tak terhitung, atau yang memiliki ukuran kira-kira analog dengan mereka, seperti himpunan tak terhingga dari lapisan hirarki atau bidang eksistensi, terutama yang Jumlah lapisan sebanding dengan himpunan semua bilangan real, dan dengan demikian disamakan dengan kardinal tak terhingga pertama yang tak terhitung, ℵ1, demi kesederhanaan.

Alternatifnya, tingkat ini juga dapat ditetapkan ke karakter yang melampaui struktur 1-B Tinggi ketika tidak ada konteks lebih lanjut mengenai sifat transendensi tersebut diberikan.

#1-A | Outerverse: Karakter yang secara signifikan dapat mempengaruhi, membuat dan / atau menghancurkan alam atau keadaan yang sepenuhnya melampaui hierarki berlapis tak terbatas dan / atau tingkat dimensi pada tingkat konseptual atau eksistensial, biasanya digambarkan sebagai abstraksi yang sepenuhnya eksternal yang berada di luar aplikasi dimensionalitas spasiotemporal sebagai konstanta yang didefinisikan oleh fisika pada tingkat mana pun, bahkan dibandingkan dengan dimensi tak hingga atau tak terhingga tak terhingga, biasanya dengan menganggapnya serupa dengan fiksi atau sesuatu yang serupa tidak signifikan.

Namun, perhatikan bahwa karakter dapat memenuhi syarat untuk peringkat ini bahkan jika syairnya tidak memiliki lapisan yang tak terbatas atau kosmologi yang setara, selama dinyatakan, ditampilkan, atau dibiarkan sangat jelas bahwa karakter tersebut sudah melewati sifatnya. struktur seperti itu secara keseluruhan, dengan cara yang hanya "menumpuk" lebih banyak dari mereka secara logis tidak akan memungkinkan seseorang untuk mencapai tingkat kekuatan / ukurannya.

Secara matematis, 1-A memiliki ukurannya yang diwakili oleh kardinal tak terhingga yang tak terhitung di luar aplikasi berguna dari ukuran tertentu (ℵ2 dan seterusnya, paling spesifik) dan dapat diperluas ke tingkat tak terhingga yang lebih besar, mewakili kompleksitas berbeda atau "langkah" kualitatif pada skala Outerversal , dengan cara yang sama 1-B dan 1-C dibagi. Karakter yang berdiri dalam jumlah tak terbatas langkah di atas alam dan struktur Outerversal "Baseline" harus memiliki pengubah + di bagian Potensi Serangan mereka (level Luar +)

#High 1-A | Outerverse Tinggi: Karakter yang dapat mempengaruhi dan membuat / menghancurkan negara bagian atau alam yang sepenuhnya melampaui hierarki Outerversal berlapis tak terbatas dan ekstensi apa pun darinya, serta kerangka kerja di mana entitas tersebut didefinisikan di tempat pertama. Perhatikan bahwa menambahkan lebih banyak "lapisan" ke hierarki 1-A yang sudah tak terbatas (atau beberapa struktur dengan ukuran yang setara) tidak cukup untuk mencapai tingkat ini, dan seseorang harus sepenuhnya eksternal dan tidak dapat dijangkau olehnya dalam bentuk apa pun.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "0") {
		conn.sendMessage(
			m.chat,
			{
				text: `*「 Tingkat 0: Tanpa Batas/Boundless 」*
#0 | Tanpa batas: Karakter yang menunjukkan kesetaraan dengan, atau dapat membuat / menghancurkan / mempengaruhi, tingkat eksistensi abstrak transendental yang secara konseptual lebih unggul dari level 1-A Tinggi sekalipun. Menjadi "mahakuasa" atau alasan serupa hampir tidak cukup untuk mencapai tingkat ini; karakter pada level ini harus melampaui karakter 1-A Tinggi karena karakter 1-A Tinggi akan melampaui karakter 1-A. Tingkat ini tidak memiliki titik akhir yang sebenarnya, dan dapat diperpanjang ke tingkat yang lebih tinggi, berputar ke atas tanpa batas.`,
			},
			{ quoted: m },
		);
	} else if (args[0]?.toLowerCase() === "full") {
		conn.sendMessage(
			m.chat,
			{
				text: `*Tiering Anime ࿐໋*

*[≽️ Tingkat 11: Sangat Kecil*
Tidak ada nilai joule yang tersedia. Tingkatan ini berkaitan dengan karakter yang dapat membuat / menghancurkan atau memengaruhi seluruh struktur alam semesta berdimensi lebih rendah, atau lapisan / level realitas yang lebih rendah. Harap dicatat bahwa yang ada sebagai gambar atau dibuat dari data / informasi tidak dapat diperingkat pada tingkatan ini, karena makhluk tersebut masih 3 dimensi, tetapi dalam skala yang sangat kecil.

#11-C: Tingkat Hypoverse Rendah
Karakter yang mendemonstrasikan kekuatan yang setara dengan menghancurkan / membuat konstruksi level 0-D dengan ukuran berapa pun, atau tiga level tak terhingga / derajat realitas / transendensi fiksi atau serupa di bawah realitas 3-D. Tingkatan ini juga mencakup karakter yang berada jauh di bawah level ini, dan semua karakter yang berada di bawah persyaratan tingkatan ini secara signifikan akan tetap berada di tingkatan ini.

#11-B: Tingkat hipoverse
Karakter yang menunjukkan kekuatan yang setara dengan menghancurkan / menciptakan konstruksi level 1-D yang secara eksistensial lebih rendah dari berbagai ukuran, atau dua tingkat tak terhingga / derajat realitas / transendensi fiksi atau serupa di bawah realitas 3-D.

#11-A: Tingkat Hypoverse Tinggi
Karakter yang menunjukkan kekuatan yang setara dengan menghancurkan / menciptakan konstruksi tingkat 2-D yang secara eksistensial lebih rendah dari berbagai ukuran, atau 1 tingkat tak terhingga / derajat realitas / transendensi fiksi atau serupa di bawah realitas 3-D.


*[≽️ Tingkat 10: Manusia*
#10-C: Di Bawah Rata-Rata Tingkat Manusia
Karakter yang mampu mengerahkan kekuatan sebanding dengan manusia yang berada di bawah norma rata-rata dalam hal kekuatan, seperti anak kecil atau orang lemah, serta hewan yang lebih kecil seperti kucing dan anjing.

#10-B: Tingkat manusia
Karakter yang mampu mengerahkan kekuatan yang sebanding dengan manusia biasa, seperti remaja atau orang dewasa yang tidak atletis.

#10-A: Level atlet
Karakter yang mampu memberikan kekuatan yang sebanding dengan manusia yang lebih atletis, seperti petarung terlatih atau individu yang secara umum sehat secara fisik.


*[≽️ Tingkat 9: Manusia Super*
#9-C: Tingkat jalanan
Karakter yang berdiri di ambang kekuatan dan kemampuan manusia, diwakili oleh atlet tingkat Olimpiade atau seniman bela diri yang terlatih dengan ketat, serta hewan yang lebih besar.

Penting untuk dicatat bahwa, meskipun dinamai "Street level", tingkat ini tidak ada hubungannya dengan benar-benar mempengaruhi keseluruhan jalan, dengan nama yang lebih mengacu pada pejuang jalanan seperti yang digambarkan dalam film seni bela diri dan sejenisnya.

#9-B: Tingkat dinding
Karakter yang dapat menghancurkan atau merusak secara signifikan bahan yang sangat tahan seperti batu, logam atau baja, serta bagian konstruksi yang tahan serupa seperti batu dan dinding struktural.

#9-A: Tingkat Bangunan Kecil
Karakter yang mampu menghancurkan ruangan atau seluruh bangunan kecil seperti rumah atau bangunan yang lebih sederhana.


*[≽️ Tingkat 8: Perkotaan*
#8-C: Tingkat bangunan
Karakter yang dapat menghancurkan bangunan dan konstruksi berukuran sedang, seperti pabrik besar atau kompleks besar seperti supermarket.

#Tinggi 8-C: Tingkat Bangunan Besar
Karakter yang dapat menghancurkan bangunan besar seperti gedung pencakar langit.

#8-B: Tingkat Blok Kota
Karakter yang dapat menghancurkan blok kota kota atau area ruang yang setara.

#8-A: Level Blok Multi-Kota
Karakter yang dapat menghancurkan beberapa blok kota atau area ruang yang setara.


*[≽️ Tingkat 7: Nuklir*
#Low 7-C: Tingkat Kota Kecil
Karakter yang dapat menghancurkan kota kecil atau pemukiman, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat kota kecil.

#7-C: Tingkat kota
Karakter yang dapat menghancurkan kota, atau yang dapat dengan mudah melukai karakter dengan daya tahan level kota.

#High 7-C: Tingkat Kota Besar
Karakter yang dapat menghancurkan kota besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan level kota besar.

#Low 7-B: Tingkat Kota Kecil
Karakter yang dapat menghancurkan kota kecil, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat kota kecil.

#7-B: Tingkat kota
Karakter / Senjata yang dapat menghancurkan kota, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat kota.

#7-A: Tingkat gunung
Karakter / Senjata yang dapat menghancurkan gunung, atau yang dapat dengan mudah melukai karakter dengan daya tahan level gunung.

#Tinggi 7-A: Tingkat Gunung Besar
Karakter yang dapat menghancurkan gunung besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat gunung yang besar.


*[≽️ Tingkat 6: Tektonik*
#6-C: Tingkat pulau
Karakter / Senjata yang dapat menghancurkan pulau, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat pulau.

#High 6-C: Tingkat Pulau Besar
Karakter yang dapat menghancurkan pulau besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat pulau besar.

#Low 6-B: Tingkat Negara Kecil
Karakter yang dapat menghancurkan negara kecil, atau yang dapat dengan mudah melukai karakter dengan daya tahan level negara kecil.

#6-B: Tingkat negara
Karakter yang dapat menghancurkan negara, atau yang dapat dengan mudah melukai karakter dengan daya tahan level negara.

#High 6-B: Tingkat Negara Besar
Karakter yang dapat menghancurkan negara besar, atau yang dapat dengan mudah melukai karakter dengan daya tahan level negara besar.

#6-A: Tingkat benua
Karakter yang bisa menghancurkan benua atau yang bisatidak membahayakan karakter dengan daya tahan tingkat benua.

#High 6-A: Tingkat Multi-Benua
Karakter yang dapat menghancurkan banyak benua atau yang dapat dengan mudah melukai karakter dengan daya tahan level multi-benua.


*[≽️ Tingkat 5: Planet*
#5-C: Tingkat bulan
Karakter yang dapat menghancurkan bulan, atau objek astrologi dengan proporsi yang sama.

#Low 5-B: Tingkat Planet Kecil 
Karakter yang dapat menghancurkan planet kecil atau yang dapat dengan mudah melukai karakter dengan daya tahan tingkat planet kecil.

#5-B: Tingkat planet
Karakter yang dapat membuat / menghancurkan planet.

#5-A: Tingkat Planet Besar
Karakter yang dapat membuat / menghancurkan raksasa gas besar seperti Jupiter dan Saturnus.

#High 5-A: Level Bintang Dwarf
Karakter yang dapat membuat / menghancurkan bintang yang sangat kecil.


*[≽️ Tingkat 4: Stellar*
#Low 4-C: Tingkat Bintang Kecil
Karakter yang dapat membuat / menghancurkan bintang kecil.

#4-C: Tingkat bintang
Karakter yang dapat membuat / menghancurkan bintang.

#High 4-C: Tingkat Bintang Besar
Karakter yang dapat membuat / menghancurkan bintang besar.

#4-B: Tingkat Tata Surya
Karakter yang dapat membuat / menghancurkan tata surya.

#4-A: Tingkat Multi-Tata Surya
Karakter yang dapat membuat / menghancurkan banyak tata surya.

*[≽️ Tingkat 3: Kosmik*
#3-C: Tingkat galaksi
Karakter yang mampu menciptakan dan / atau menghancurkan galaksi, jika ruang antara benda-benda langit diperhitungkan, bukan hanya materi yang dicakupnya.

#3-B: Tingkat multi-Galaxy
Karakter yang mampu membuat dan / atau menghancurkan banyak galaksi jika ruang antar benda langit juga diperhitungkan.

#3-A: Tingkat alam semesta
Karakter yang secara signifikan dapat mempengaruhi, menciptakan dan / atau menghancurkan alam semesta setidaknya sebesar ukuran kita sendiri, tetapi tidak jauh lebih besar.

#High 3-A: Tingkat Alam Semesta Tinggi
Karakter yang mendemonstrasikan jumlah energi tak terhingga pada skala 3-D, atau mereka yang dapat memengaruhi area 3-D tak hingga atau jumlah tak hingga dari alam semesta hingga atau tak hingga saat tidak memperhitungkan dimensi atau waktu yang lebih tinggi, atau lebih umum lagi ranah apa pun dengan ukuran yang sebanding. Sejumlah besar alam semesta tak terbatas, kecuali saling tertutup secara kausal oleh ruangwaktu atau keberadaan terpisah, hanya dihitung untuk tingkat yang lebih tinggi dari tingkatan ini. Menjadi "tak terbatas" lebih kuat dari level ini, kecuali tidak terhitung, tidak memenuhi syarat untuk tingkatan yang lebih tinggi.


*[≽️ Tingkat 2: Multiversal*
Low 2-C | Tingkat alam semesta +: Karakter yang mampu mempengaruhi secara signifikan, menciptakan dan / atau menghancurkan area ruang yang secara kualitatif lebih besar dari ruang 3 dimensi berukuran tak terhingga. Contoh ruang-waktu fiksi umum yang merepresentasikan ukuran seperti itu adalah kontinum ruang-waktu dalam skala universal. Namun, ini dapat secara lebih umum dipenuhi oleh ruang 4 dimensi apa pun yang:

A.) Setara dengan ruang dimensi ekstra besar. Artinya, ruang "massal" berdimensi lebih tinggi yang menyematkan ruang berdimensi lebih rendah (seperti alam semesta kita) sebagai himpunan bagian dari dirinya sendiri, yang dimensinya tidak mikroskopis / dipadatkan.

B.) Digambarkan sebagai objek dan ruang berdimensi rendah yang sepenuhnya melampaui latar dalam latar suatu karya fiksi.

#2-C | Level Multiverse Rendah: Karakter yang dapat mempengaruhi secara signifikan, membuat dan / atau menghancurkan multiverse kecil yang dapat terdiri dari beberapa kontinum ruang-waktu terpisah mulai dari dua hingga seribu, atau setara.

#2-B: Level multiverse
Karakter yang secara signifikan dapat mempengaruhi [1], membuat dan / atau menghancurkan multiverse yang lebih besar yang terdiri dari 1001 hingga jumlah terbatas yang lebih tinggi dari kontinum ruang-waktu terpisah.

#2-A: Level multiverse +
Karakter yang mampu mempengaruhi secara signifikan, membuat dan / atau menghancurkan kontinum ruang-waktu yang tak terhitung jumlahnya.


*[≽️ Tingkat 1: Ekstradimensi*
Karakter yang secara signifikan dapat mempengaruhi ruang dengan ukuran yang secara kualitatif lebih besar daripada model dan ruang universal biasa, biasanya diwakili dalam fiksi oleh tingkat atau keadaan keberadaan yang lebih tinggi (Atau "tingkat ketidakterbatasan") yang meremehkan segala sesuatu di bawahnya menjadi tidak penting, biasanya oleh menganggapnya mirip dengan konstruksi fiksi atau sesuatu yang sangat kecil.

#Low 1-C | Level Multiverse Kompleks Rendah: Karakter yang dapat memengaruhi, membuat, dan / atau menghancurkan keseluruhan ruang yang ukurannya sesuai dengan satu hingga dua tingkat tak terhingga yang lebih tinggi daripada model universal standar (struktur 2-C rendah, dalam bahasa Inggris sederhana.) skala "dimensional", ini dapat disamakan dengan ruang koordinat nyata 5 dan 6 dimensi (R ^ 5 hingga R ^ 6)

#1-C | Level Multiverse Kompleks: Karakter yang dapat memengaruhi, membuat, dan / atau menghancurkan ruang yang ukurannya sesuai dengan tiga hingga lima level tak terhingga yang lebih tinggi lebih besar dari model universal standar. Dalam skala "dimensional", ini dapat disamakan dengan ruang koordinat nyata 7 dan 9 dimensi (R ^ 7 sampai R ^ 9)

#High 1-C | Level Multiverse Kompleks Tinggi: Karakter yang dapat memengaruhi, membuat, dan / atau menghancurkan ruang secara universal yang ukurannya sesuai dengan enam hingga tujuh tingkat tak terhingga yang lebih tinggi dari model universal standar. Dalam skala "dimensional", ini dapat disamakan dengan ruang koordinat nyata 10 dan 11-dimensi (R ^ 10 sampai R ^ 11)

#1-B | Level Hyperverse: Karakter yang dapat secara universal mempengaruhi, membuat dan / atau menghancurkan ruang yang ukurannya sesuai dari 8 hingga level tak terhingga yang lebih tinggi di atas model universal standar. Dalam hal ukuran "dimensional", ini dapat disamakan dengan ruang koordinat nyata 12 dimensi ke atas (R ^ 12 ke atas)

#High 1-B | Tingkat Hyperverse Tinggi: Karakter yang secara universal dapat mempengaruhi, membuat dan / atau menghancurkan struktur yang ukurannya setara dengan ukuran kualitatif yang tak terhitung jumlahnya di atas model universal, biasanya diwakili dalam fiksi oleh hierarki lapisan eksistensi yang tak ada habisnya, masing-masing menggantikan yang benar-benar meremehkan yang sebelumnya menjadi tidak penting, atau lebih umum lagi ruang dengan dimensi tak terhingga yang tak terhitung.

#1-A: Tingkat luar
Karakter yang secara fungsional melampaui sistem Tiering lainnya, dan berdiri di luar ekstensi hierarki dan ukuran tak terbatas, dengan berbagai derajat dan besaran. Dalam istilah yang lebih sederhana, kategori ini dapat dikatakan ditempati oleh karakter yang ukuran dan / atau level kekuatannya tidak dapat dicapai hanya dengan menumpuk infinitas yang lebih besar di atas satu sama lain.

#Low 1-A | Outerverse Rendah: Karakter yang dapat secara universal mempengaruhi, membuat dan / atau menghancurkan struktur dan bentangan dimensi tak terhingga yang tak terhitung, atau yang memiliki ukuran kira-kira analog dengan mereka, seperti himpunan tak terhingga dari lapisan hirarki atau bidang eksistensi, terutama yang Jumlah lapisan sebanding dengan himpunan semua bilangan real, dan dengan demikian disamakan dengan kardinal tak terhingga pertama yang tak terhitung, ℵ1, demi kesederhanaan.

Alternatifnya, tingkat ini juga dapat ditetapkan ke karakter yang melampaui struktur 1-B Tinggi ketika tidak ada konteks lebih lanjut mengenai sifat transendensi tersebut diberikan.

#1-A | Outerverse: Karakter yang secara signifikan dapat mempengaruhi, membuat dan / atau menghancurkan alam atau keadaan yang sepenuhnya melampaui hierarki berlapis tak terbatas dan / atau tingkat dimensi pada tingkat konseptual atau eksistensial, biasanya digambarkan sebagai abstraksi yang sepenuhnya eksternal yang berada di luar aplikasi dimensionalitas spasiotemporal sebagai konstanta yang didefinisikan oleh fisika pada tingkat mana pun, bahkan dibandingkan dengan dimensi tak hingga atau tak terhingga tak terhingga, biasanya dengan menganggapnya serupa dengan fiksi atau sesuatu yang serupa tidak signifikan.

Namun, perhatikan bahwa karakter dapat memenuhi syarat untuk peringkat ini bahkan jika syairnya tidak memiliki lapisan yang tak terbatas atau kosmologi yang setara, selama dinyatakan, ditampilkan, atau dibiarkan sangat jelas bahwa karakter tersebut sudah melewati sifatnya. struktur seperti itu secara keseluruhan, dengan cara yang hanya "menumpuk" lebih banyak dari mereka secara logis tidak akan memungkinkan seseorang untuk mencapai tingkat kekuatan / ukurannya.

Secara matematis, 1-A memiliki ukurannya yang diwakili oleh kardinal tak terhingga yang tak terhitung di luar aplikasi berguna dari ukuran tertentu (ℵ2 dan seterusnya, paling spesifik) dan dapat diperluas ke tingkat tak terhingga yang lebih besar, mewakili kompleksitas berbeda atau "langkah" kualitatif pada skala Outerversal , dengan cara yang sama 1-B dan 1-C dibagi. Karakter yang berdiri dalam jumlah tak terbatas langkah di atas alam dan struktur Outerversal "Baseline" harus memiliki pengubah + di bagian Potensi Serangan mereka (level Luar +)

#High 1-A | Outerverse Tinggi: Karakter yang dapat mempengaruhi dan membuat / menghancurkan negara bagian atau alam yang sepenuhnya melampaui hierarki Outerversal berlapis tak terbatas dan ekstensi apa pun darinya, serta kerangka kerja di mana entitas tersebut didefinisikan di tempat pertama. Perhatikan bahwa menambahkan lebih banyak "lapisan" ke hierarki 1-A yang sudah tak terbatas (atau beberapa struktur dengan ukuran yang setara) tidak cukup untuk mencapai tingkat ini, dan seseorang harus sepenuhnya eksternal dan tidak dapat dijangkau olehnya dalam bentuk apa pun.


*[≽️ Tingkat 0: Tanpa Batas/Boundless*
#0 | Tanpa batas: Karakter yang menunjukkan kesetaraan dengan, atau dapat membuat / menghancurkan / mempengaruhi, tingkat eksistensi abstrak transendental yang secara konseptual lebih unggul dari level 1-A Tinggi sekalipun. Menjadi "mahakuasa" atau alasan serupa hampir tidak cukup untuk mencapai tingkat ini; karakter pada level ini harus melampaui karakter 1-A Tinggi karena karakter 1-A Tinggi akan melampaui karakter 1-A. Tingkat ini tidak memiliki titik akhir yang sebenarnya, dan dapat diperpanjang ke tingkat yang lebih tinggi, berputar ke atas tanpa batas.`,
			},
			{ quoted: m },
		);
	}
};
jarspy.help = ["tier"];
jarspy.tags = ["anime"];
jarspy.command = /^(tiering|tier|tieringanime)$/i;

export default jarspy