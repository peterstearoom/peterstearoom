// public/sw.js
self.addEventListener('sync', async (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(flushOrderQueue())
  }
})
async function syncOfflineOrders() {
  const data = await localforage.getItem('offlineOrders')
  if (!data || !Array.isArray(data)) return

  for (const order of data) {
    try {
      await fetch('/api/sync-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
    } catch (err) {
      console.error('Failed to sync order', err)
    }
  }

  await localforage.removeItem('offlineOrders')
}

async function flushOrderQueue() {
  const orders = await getQueuedOrders()
  for (const order of orders) {
    try {
      await fetch('/api/submitOrder', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json' }
      })
      await removeQueuedOrder(order.id)
    } catch (err) {
      console.error('[Service Worker] Failed to submit order', err)
    }
  }
}
