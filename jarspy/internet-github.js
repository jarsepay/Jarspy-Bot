import fetch from 'node-fetch' 
let jarspy = async (m, { text }) => { 
     if (!text) throw 'Apa yang ingin kamu cari?' 
     let res = await fetch(global.API('https://api.github.com', '/search/repositories', { 
         q: text 
     })) 
     let json = await res.json() 
     if (res.status !== 200) throw json 
     let str = json.items.map((repo, index) => { 
         return ` 
 ${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''} 
◦ _${repo.html_url}_ 
◦ _Dibuat pada *${formatDate(repo.created_at)}*_ 
◦ _Terakhir update pada *${formatDate(repo.updated_at)}*_ 
◦ 👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count} 
◦ ${repo.open_issues} Issue${repo.description ? ` 
◦ *Deskripsi:*\n${repo.description}` : ''} 
◦ *Clone:* \`\`\`.gitclone ${repo.clone_url}\`\`\` 
 `.trim() 
     }).join('\n\n') 
     m.reply(str) 
} 
jarspy.help = ['github']
jarspy.tags = ['internet'] 
jarspy.command = /^(github|ghsearch|githubsearch)$/i 
  
export default jarspy 
  
function formatDate(n, locale = 'id') { 
     let d = new Date(n) 
     return d.toLocaleDateString(locale, { 
       weekday: 'long', 
       day: 'numeric', 
       month: 'long', 
       year: 'numeric', 
       hour: 'numeric', 
       minute: 'numeric', 
       second: 'numeric' 
     }) 
   }