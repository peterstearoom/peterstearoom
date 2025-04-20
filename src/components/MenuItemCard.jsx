import React, { useState } from 'react'
import { useOrderStore } from '../store/useOrderStore'

function MenuItemCard({ item }) {
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const addItem = useOrderStore((s) => s.addItem)

  const handleAdd = () => {
    addItem({ ...item, qty, note })
    setQty(1)
    setNote('')
  }

  return (
<div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-150">
  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
  <p className="text-sm text-gray-500 mb-2">£{item.price.toFixed(2)}</p>

  <input
    type="number"
    min="1"
    value={qty}
    onChange={(e) => setQty(Number(e.target.value))}
    className="border w-full px-3 py-2 rounded-md text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
  />

  <textarea
    placeholder="e.g. beans/tomatoes or well done/crispy"
    value={note}
    onChange={(e) => setNote(e.target.value)}
    className="w-full border px-3 py-2 rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
  />

  <button
    onClick={handleAdd}
    className="w-full bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition"
  >
    ➕ Add to Order
  </button>
</div>

  )
}

export default MenuItemCard
