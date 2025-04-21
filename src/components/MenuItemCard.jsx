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
    <div className="bg-white p-big rounded-2xl shadow-heavy border border-tea-dark hover:shadow-lg transition-all duration-150">
      <h3 className="text-xxl font-semibold text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-500 mb-2">£{item.price.toFixed(2)}</p>

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border border-gray-300 w-full px-3 py-2 rounded-md text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <textarea
        placeholder="Additional notes"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <button
        onClick={handleAdd}
        className="w-full bg-accent hover:bg-green-600 text-white text-xl font-bold py-3 px-4 rounded-2xl shadow-md transition-all active:scale-[0.98]"
      >
        ➕ Add to Order
      </button>
    </div>
  )
}

export default MenuItemCard
