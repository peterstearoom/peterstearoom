// public/sw.js
self.addEventListener('sync', async (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(flushOrderQueue())
  }
})

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
