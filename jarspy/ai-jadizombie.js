import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';

let jarspy = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) {
        throw `Kirim/Reply Gambar Dengan Caption ${usedPrefix}${command}`;
    }
    let media = await q.download();
    
    const result = await ToZombi(media);
    
    if (!result) {
        throw 'Terjadi kesalahan saat mengonversi gambar ke zombie.';
    }
    
    const tag = `@${m.sender.split('@')[0]}`;
    
    return conn.sendMessage(m.chat, {
        image: result,
        caption: `*photo-to-zombie*\nPermintaan dari: ${tag}`,
        mentions: [m.sender]
    }, {
        quoted: m
    });
}

jarspy.help = ["jadizombie"];
jarspy.tags = ["ai"];
jarspy.command = /^(jadizombie)$/i;
jarspy.limit = 10;
export default jarspy;

async function ToZombi(imageBuffer) {
    try {
        const { ext, mime } = await fileTypeFromBuffer(imageBuffer) || {};
        if (!ext || !mime) {
            return null;
        }
        let form = new FormData();
        const blob = new Blob([imageBuffer.toArrayBuffer()], { type: mime });
        form.append('image', blob, 'image.' + ext);

        const response = await fetch("https://deepgrave-image-processor-no7pxf7mmq-uc.a.run.app/transform_in_place", {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }

        const base64Data = await response.text();
        
        // Convert base64 to image buffer and return it
        return Buffer.from(base64Data, 'base64');
    } catch (error) {
        return null;
    }
}