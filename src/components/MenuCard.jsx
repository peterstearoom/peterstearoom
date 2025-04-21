import React from 'react'
import { useOrderStore } from '../store/useOrderStore'
import '../styles/custom.css'

const fallbackEmojis = {
  food: '🍽️',
  drinks: '🥤'
}

function MenuCard({ item }) {
  const addItem = useOrderStore((s) => s.addItem)
  const image = item.image || fallbackEmojis[item.category] || '🍴'

  return (
    <div
      className="menu-card"
      onClick={() => addItem({ ...item, qty: 1, note: '' })}
    >
      <div className="menu-image">{image}</div>
      <h3 className="menu-name">{item.name}</h3>
      <p className="menu-price">£{item.price.toFixed(2)}</p>
      <button className="menu-add-btn">➕ Add</button>
    </div>
  )
}

export default MenuCard
