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

    // Cold sandwich logic
    if (item.subcategory === 'Cold sandwiches') {
      if (addSalad) {
        finalName = finalName.replace('muffin', 'salad muffin')
        finalPrice += 0.9
        if (addOnions) finalName += ' (onions)'
      }
    }

    // Breakfast logic
    if (item.subcategory === 'Breakfast') {
      let extras = ''
      if (beansOption) {
        extras += `(${beansOption}`
      }

      if (blackPud) {
        finalPrice += 1.4
        extras += beansOption ? ' + black pud' : '(black pud'
      }

      if (extras) {
        extras += ')'
        finalName += ' ' + extras
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
            /> Add salad? (+£0.90)
          </label>

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
      {item.subcategory === 'Breakfast' &&
        (item.name.includes('Small breakfast') || item.name.includes('Large breakfast')) && (
          <div style={{ marginTop: '1rem' }}>
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
              /> Both
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
