import db from '../lib/database/index.js'

const BANNED_TIME = 60 * 60 * 1000

export async function all(m, { isROwner }) {
    const user = await db.users.get(m.sender)

    if (!m.message || isROwner || user?.banned) {
        return
    }

    this.spam = this.spam ? this.spam : {}

    if (m.sender in this.spam) {
        this.spam[m.sender].count++

        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 6) {
            if (this.spam[m.sender].count > 6) {
                await Promise.all([
                    db.users.update(m.sender, (user) => {
                        user.banned = true
                        user.bannedExpired = Date.now() + BANNED_TIME
                    }),
                    m.reply(`Kamu dibanned sementara karena spam selama ${BANNED_TIME.toTimeString()}`)
                ])
            }

            this.spam[m.sender].count = 0
            this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
        }
    } else {
        this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        }
    }
}
