/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

// JANGAN DI APA APAIN, INI UDAH DIFIX SEPENUHNYA
import db from '../lib/database/index.js';

// Objek untuk menyimpan data pengguna yang telah di-cache dan sudah terurut
const sortedUserCache = [];

// Objek untuk menyimpan semua data pengguna yang telah di-cache tanpa sorting
const userCache = {};

// Jumlah maksimal pengguna yang diperbarui dalam satu batch
const batchSize = 100;

// Waktu jeda antara setiap batch (dalam milidetik)
const batchDelay = 1000;

// Waktu interval untuk pembaruan cache (dalam milidetik)
const cacheUpdateInterval = 3600000 * 1; // 1 jam

let cacheUpdateTimer; // Timer untuk pembaruan cache

export async function updateCache() {
  const jids = await db.users.keys();

  // Hapus cache lama sebelum pembaruan
  clearCache();

  // Membagi pengguna menjadi batch yang lebih kecil
  const batches = chunkArray(jids, batchSize);

  // Memperbarui cache secara berurutan dengan jeda waktu
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    await updateBatchCache(batch);
    await sleep(batchDelay);
  }
}

async function updateBatchCache(batch) {
  const users = await Promise.all(
    batch.map(async (jid) => {
      const data = await db.users.get(jid);
      if (data.nama === "-") {
          await db.users.delete(jid.replace(/\.json$/, ''));
          return { ...data, jid: jid.replace(/\.json$/, '') };
      } else {
          return { ...data, jid: jid.replace(/\.json$/, '') };
      }
    })
  );

  // Menyortir pengguna berdasarkan nama sebelum memasukkan ke dalam cache
  const sortedUsers = users.filter(user => user.nama !== "-").sort((a, b) => a.nama.localeCompare(b.nama));

  // Menggabungkan batch pengguna yang sudah terurut ke dalam cache
  sortedUserCache.push(...sortedUsers);

  // Menggabungkan semua data pengguna (termasuk yang belum terurut) ke dalam cache
  users.forEach((user) => {
    userCache[user.jid] = user;
  });
}

export function getUserCache() {
  return sortedUserCache;
}

export function getUserCacheAll() {
  return Object.values(userCache);
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    chunks.push(chunk);
  }
  return chunks;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearCache() {
  // Hapus semua entri cache lama
  sortedUserCache.length = 0;
  for (const key in userCache) {
    delete userCache[key];
  }
}

// Memulai pembaruan cache saat modul ini diimpor
updateCache();

// Setelah pembaruan selesai, atur interval pembaruan setiap 1 jam
cacheUpdateTimer = setInterval(async () => {
  await updateCache();
}, cacheUpdateInterval);