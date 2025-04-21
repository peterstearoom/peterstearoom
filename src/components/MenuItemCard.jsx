import React, { useState } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import '../styles/custom.css'

function MenuItemCard({ item }) {
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [addSalad, setAddSalad] = useState(false)
  const [addOnions, setAddOnions] = useState(false)
  const [beansOption, setBeansOption] = useState('')
  const [blackPud, setBlackPud] = useState(false)

  const addItem = useOrderStore((s) => s.addItem)

  const handleAdd = () => {
    let finalName = item.name
    let finalPrice = item.price

    // 🥪 Cold Sandwich logic
    if (item.subcategory === 'Cold sandwiches') {
      if (addSalad) {
        finalName = finalName.replace('muffin', 'salad muffin')
        finalPrice += 1.5
        if (addOnions) finalName += ' (onions)'
      }
    }

    // 🍳 Breakfast logic (Small / Large only)
    if (
      item.subcategory === 'Breakfasts' &&
      (item.name.toLowerCase().includes('small breakfast') || item.name.toLowerCase().includes('large breakfast'))
    ) {
      let extras = []

      if (beansOption) {
        if (beansOption === 'both') {
          finalPrice += 0.4
        }
        extras.push(beansOption)
      }

      if (blackPud) {
        extras.push('black pud')
        finalPrice += 1.4
      }

      if (extras.length > 0) {
        finalName += ` (${extras.join(' + ')})`
      }
    }

    addItem({ ...item, name: finalName, price: finalPrice, qty, note })
    setQty(1)
    setNote('')
    setAddSalad(false)
    setAddOnions(false)
    setBeansOption('')
    setBlackPud(false)
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

      {/* 🥗 Cold Sandwich Options */}
      {item.subcategory === 'Cold sandwiches' && (
        <>
          <label>
            <input
              type="checkbox"
              checked={addSalad}
              onChange={() => {
                setAddSalad(!addSalad)
                if (!addSalad) setAddOnions(false)
              }}
            /> Add salad? (+£1.50)
          </label><br />

          {addSalad && (
            <label>
              <input
                type="checkbox"
                checked={addOnions}
                onChange={() => setAddOnions(!addOnions)}
              /> Add onions?
            </label>
          )}
        </>
      )}

      {/* 🍳 Breakfast Options */}
      {item.subcategory === 'Breakfasts' &&
        (item.name.toLowerCase().includes('small breakfast') || item.name.toLowerCase().includes('large breakfast')) && (
          <div className="breakfast-options" style={{ marginTop: '1rem' }}>
            <p style={{ fontWeight: 600 }}>Breakfast Extras:</p>

            <label>
              <input
                type="radio"
                name={`beans-${item.name}`}
                checked={beansOption === 'beans'}
                onChange={() => setBeansOption('beans')}
              /> Beans
            </label><br />

            <label>
              <input
                type="radio"
                name={`beans-${item.name}`}
                checked={beansOption === 'tomatoes'}
                onChange={() => setBeansOption('tomatoes')}
              /> Tomatoes
            </label><br />

            <label>
              <input
                type="radio"
                name={`beans-${item.name}`}
                checked={beansOption === 'both'}
                onChange={() => setBeansOption('both')}
              /> Both (£0.40)
            </label><br />

            <label>
              <input
                type="checkbox"
                checked={blackPud}
                onChange={() => setBlackPud(!blackPud)}
              /> Add black pudding? (+£1.40)
            </label>
          </div>
      )}

      <button onClick={handleAdd} className="item-add-btn">
        ➕ Add to Order
      </button>
    </div>
  )
}

export default MenuItemCard
