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
<div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
      <h3 className="font-bold">{item.name}</h3>
      <p className="text-sm text-gray-600">£{item.price.toFixed(2)}</p>

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border w-full mt-2 px-2 py-1 text-sm"
      />

      <textarea
        placeholder="Notes (e.g. no sugar)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border w-full mt-2 px-2 py-1 text-sm"
      />

      <button
        onClick={handleAdd}
        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Add to Order
      </button>
    </div>
  )
}

export default MenuItemCard
