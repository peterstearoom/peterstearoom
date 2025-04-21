export async function saveOrderOffline(order) {
  const queue = JSON.parse(localStorage.getItem('offlineOrders') || '[]')
  order.id = Date.now()
  queue.push(order)
  localStorage.setItem('offlineOrders', JSON.stringify(queue))
}

export async function getQueuedOrders() {
  return JSON.parse(localStorage.getItem('offlineOrders') || '[]')
}

export async function removeQueuedOrder(id) {
  const queue = JSON.parse(localStorage.getItem('offlineOrders') || '[]')
  const filtered = queue.filter(o => o.id !== id)
  localStorage.setItem('offlineOrders', JSON.stringify(filtered))
}
