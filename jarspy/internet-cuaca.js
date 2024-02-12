import fetch from 'node-fetch'

let jarspy = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh pemakaian:\n${usedPrefix + command} Samarinda`
    let res = await fetch(API('https://api.openweathermap.org', '/data/2.5/weather', {
        q: text,
        units: 'metric',
        appid: '060a6bcfa19809c2cd4d97a212b19273'
    }))
    if (!res.ok) throw 'Lokasi tidak ditemukan'
    let json = await res.json()
    if (json.cod != 200) throw json
    let weat = `◦ Negara: ${json.sys.country}\n◦ Cuaca: ${json.weather[0].description}\n◦ Suhu saat ini: ${json.main.temp} °C\n◦ Suhu tertinggi: ${json.main.temp_max} °C\n◦ Suhu terendah: ${json.main.temp_min} °C\n◦ Kelembapan: ${json.main.humidity} %\n◦ Angin: ${json.wind.speed} km/jam`
    m.reply(weat)

}

jarspy.help = ['cuaca']
jarspy.tags = ['internet']
jarspy.command = /^(cuaca|weather)$/i

export default jarspy