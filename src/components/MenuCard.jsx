import React from 'react'
import { useOrderStore } from '../store/useOrderStore'

const fallbackEmojis = {
  food: '🍽️',
  drinks: '🥤'
}

function MenuCard({ item }) {
  const addItem = useOrderStore((s) => s.addItem)
  const image = item.image || fallbackEmojis[item.category] || '🍴'

  return (
    <div
      onClick={() => addItem({ ...item, qty: 1, note: '' })}
      className="cursor-pointer bg-white shadow hover:shadow-lg border border-gray-200 rounded-xl p-4 transition-all active:scale-95"
    >
      <div className="text-4xl text-center mb-2">{image}</div>
      <h3 className="text-md font-semibold text-center mb-1">{item.name}</h3>
      <p className="text-center text-gray-600 text-sm mb-2">£{item.price.toFixed(2)}</p>
      <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-1 rounded-md">
        ➕ Add
      </button>
    </div>
  )
}

export default MenuCard
