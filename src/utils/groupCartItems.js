export function groupCartItems(items) {
  const grouped = {}

  items.forEach((item) => {
    const key = `${item.name}-${item.category}`
    if (!grouped[key]) {
      grouped[key] = {
        ...item,
        qty: 0,
        notes: []
      }
    }

    grouped[key].qty += item.qty

    if (item.note?.trim()) {
      grouped[key].notes.push({
        note: item.note,
        qty: item.qty
      })
    }
  })

  return Object.values(grouped)
}
