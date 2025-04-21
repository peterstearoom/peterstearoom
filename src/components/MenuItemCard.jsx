import React, { useState } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import '../styles/custom.css'

function MenuItemCard({ item }) {
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [addSalad, setAddSalad] = useState(false)
  const addItem = useOrderStore((s) => s.addItem)

  const handleAdd = () => {
    const updatedItem = {
      ...item,
      qty,
      note,
      price: addSalad ? item.price + 0.9 : item.price,
      name: addSalad ? item.name.replace(/muffin/i, 'salad muffin') : item.name,
    }

    addItem(updatedItem)
    setQty(1)
    setNote('')
    setAddSalad(false)
  }

  return (
    <div className="menu-item-card">
      <h3 className="item-title">{item.image} {item.name}</h3>
      <p className="item-price">£{(addSalad ? item.price + 0.9 : item.price).toFixed(2)}</p>

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="item-input"
      />

      <textarea
        placeholder="Additional notes"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="item-textarea"
      />

      {/* ✅ Add Salad Checkbox */}
      <div className="item-checkbox">
        <label>
          <input
            type="checkbox"
            checked={addSalad}
            onChange={(e) => setAddSalad(e.target.checked)}
          />{' '}
          Add salad? (+£0.90)
        </label>
      </div>

      <button onClick={handleAdd} className="item-add-btn">
        ➕ Add to Order
      </button>
    </div>
  )
}

export default MenuItemCard
