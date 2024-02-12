let jarspy = async (m, { teks, conn, isOwner, isAdmin, args }) => {
	if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
  let ownerGroup = m.chat.split`-`[0] + "@s.whatsapp.net";
  if(m.quoted){
if(m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
let usr = m.quoted.sender;
await conn.groupParticipantsUpdate(m.chat, [usr], "remove"); return;
}
  if (!m.mentionedJid[0]) throw `Tag yang mau dikick`;
  let users = m.mentionedJid.filter(
    (u) => !(u == ownerGroup || u.includes(conn.user.jid))
  );
  for (let user of users)
    if (user.endsWith("@s.whatsapp.net"))
      await conn.groupParticipantsUpdate(m.chat, [user], "remove");
};
 
jarspy.customPrefix = /^(out)$/i
jarspy.command = new RegExp

jarspy.group = true
jarspy.botAdmin = true

export default jarspy