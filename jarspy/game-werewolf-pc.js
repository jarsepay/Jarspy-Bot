import {
    sesi as getSesi,
    playerOnGame,
    dataPlayer,
    getPlayerById2,
    killWerewolf,
    dreamySeer,
    sorcerer,
    protectGuardian
} from '../lib/werewolf.js';

const jarspy = async (m, {
    conn,
    args
}) => {
    const {
        sender
    } = m;
    conn.werewolf = conn.werewolf ? conn.werewolf : {};
    const ww = conn.werewolf ? conn.werewolf : {};
    const value = args[0];
    const target = args[1];

    if (!playerOnGame(sender, ww))
        return m.reply("Kamu tidak dalam sesi game");
    if (dataPlayer(sender, ww).status)
        return m.reply("Skill telah digunakan, skill hanya bisa digunakan sekali setiap malam");
    if (dataPlayer(sender, ww).isdead)
        return m.reply("Kamu sudah mati");
    if (!target || target.length < 1) return m.reply("Masukkan nomor player");
    if (isNaN(target)) return m.reply("Gunakan hanya nomor");
    let byId = getPlayerById2(sender, parseInt(target), ww);
    if (byId.db.isdead) return m.reply("Player sudah mati");
    if (byId.db.id === sender)
        return m.reply("Tidak bisa menggunakan skill untuk diri sendiri");
    if (byId === false) return m.reply("Player tidak terdaftar");

    if (value === "kill" && dataPlayer(sender, ww).role === "werewolf") {
        if (byId.db.role === "sorcerer")
            return m.reply("Tidak bisa menggunakan skill untuk teman");
        m.reply("Berhasil membunuh player " + parseInt(target)).then(() => {
            dataPlayer(sender, ww).status = true;
            killWerewolf(sender, parseInt(target), ww);
        });
    } else if (value === "dreamy" && dataPlayer(sender, ww).role === "seer") {
        let dreamy = dreamySeer(m.sender, parseInt(target), ww);
        m.reply(`Berhasil membuka identitas player ${target} adalah ${dreamy}`).then(() => {
            dataPlayer(sender, ww).status = true;
        });
    } else if (value === "deff" && dataPlayer(sender, ww).role === "guardian") {
        m.reply(`Berhasil melindungi player ${target}`).then(() => {
            protectGuardian(m.sender, parseInt(target), ww);
            dataPlayer(sender, ww).status = true;
        });
    } else if (value === "sorcerer" && dataPlayer(sender, ww).role === "sorcerer") {
        let sorker = sorcerer(getSesi(m.sender), target);
        m.reply(`Berhasil membuka identitas player ${target} adalah ${sorker}`).then(() => {
            dataPlayer(sender, ww).status = true;
        });
    }
}

jarspy.help = ['wwpc'];
jarspy.tags = ['game'];
jarspy.command = ['wwpc'];

export default jarspy;