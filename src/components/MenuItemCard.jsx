import React, { useState } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import '../styles/custom.css'

function MenuItemCard({ item }) {
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [addSalad, setAddSalad] = useState(false)
  const addItem = useOrderStore((s) => s.addItem)

  const isColdSandwich = item?.subcategory?.toLowerCase() === 'cold sandwiches'

  const handleAdd = () => {
    const finalName = addSalad && isColdSandwich
      ? item.name.replace('muffin', 'salad muffin')
      : item.name

    const finalPrice = item.price + (addSalad && isColdSandwich ? 0.9 : 0)

    addItem({
      ...item,
      name: finalName,
      price: finalPrice,
      qty,
      note,
    })

    // Reset
    setQty(1)
    setNote('')
    setAddSalad(false)
  }

  return (
    <div className="menu-item-card">
      <h3 className="item-title">{item.image} {item.name}</h3>
      <p className="item-price">£{item.price.toFixed(2)}</p>

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

      {/* ✅ Salad checkbox only for Cold Sandwiches */}
      {isColdSandwich && (
        <label className="salad-checkbox">
          <input
            type="checkbox"
            checked={addSalad}
            onChange={(e) => setAddSalad(e.target.checked)}
          />
          Add salad? (+£0.90)
        </label>
      )}

      <button onClick={handleAdd} className="item-add-btn">
        ➕ Add to Order
      </button>
    </div>
  )
}

export default MenuItemCard
