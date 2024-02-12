import fetch from 'node-fetch'

let jarspy = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    await m.react('🕑')
    try {
        const imgx = await Couple();

        if (imgx) {
            const male = imgx.male;
            const female = imgx.female;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: male
                },
                caption: `Ini *male* nya ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
            await conn.sendMessage(m.chat, {
                image: {
                    url: female
                },
                caption: `Ini *female* nya ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("Tidak ada respons atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(`Error: ${e}`)
    }
}
jarspy.help = ['ppcouple']
jarspy.tags = ['anime']
jarspy.command = /^(pp(cp|couple))$/i
jarspy.limit = 3
export default jarspy

async function Couple() {
    try {
        const response = await fetch("https://tools.revesery.com/couple/revesery.php");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        throw error; // Rethrow the error to handle it further up the call stack
    }
}