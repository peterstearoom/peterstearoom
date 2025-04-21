
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
  const [toast, setToast] = useState(false)
  const [hotAdditions, setHotAdditions] = useState({
    egg: false,
    bacon: false,
    sausage: false,
    spam: false,
  })

  const addItem = useOrderStore((s) => s.addItem)

  const handleAdd = () => {
    let finalName = item.name
    let finalPrice = item.price

    // Cold Sandwich logic
    if (item.subcategory === 'Cold sandwiches') {
      if (addSalad) {
        finalName = finalName.replace('muffin', 'salad muffin')
        finalPrice += 1.5
        if (addOnions) finalName += ' (onions)'
      }
    }

    // Breakfast logic
    if (
      item.subcategory === 'Breakfasts' &&
      (item.name.toLowerCase().includes('small breakfast') || item.name.toLowerCase().includes('large breakfast'))
    ) {
      let extras = []
      if (beansOption) {
        if (beansOption === 'both') finalPrice += 0.4
        extras.push(beansOption)
      }
      if (blackPud) {
        extras.push('black pud')
        finalPrice += 1.4
      }
      if (extras.length > 0) finalName += \` (\${extras.join(' + ')})\`
    }

    // Hot Sandwich logic
    if (
      item.subcategory === 'Hot sandwiches' &&
      ['bacon muffin', 'sausage muffin', 'egg muffin', 'spam muffin'].some(v => item.name.toLowerCase().includes(v))
    ) {
      const selected = Object.entries(hotAdditions)
        .filter(([key, value]) => value && !item.name.toLowerCase().includes(key))
        .map(([key]) => key)

      if (toast) finalName = finalName.replace('muffin', 'on toast')

      if (selected.length) {
        const additions = selected.join(', ')
        finalName = \`\${finalName.split(' ')[0]}, \${additions} \${toast ? 'on toast' : 'muffin'}\`
        if (selected.length === 1) finalPrice += 0.7
        if (selected.length === 2) finalPrice += 1.0
        if (selected.length === 3) finalPrice += 1.3
      }
    }

    addItem({ ...item, name: finalName, price: finalPrice, qty, note })
    setQty(1)
    setNote('')
    setAddSalad(false)
    setAddOnions(false)
    setBeansOption('')
    setBlackPud(false)
    setHotAdditions({ egg: false, bacon: false, sausage: false, spam: false })
    setToast(false)
  }

  const handleHotChange = (key) => {
    setHotAdditions(prev => ({ ...prev, [key]: !prev[key] }))
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
                name={\`beans-\${item.name}\`}
                checked={beansOption === 'beans'}
                onChange={() => setBeansOption('beans')}
              /> Beans
            </label><br />
            <label>
              <input
                type="radio"
                name={\`beans-\${item.name}\`}
                checked={beansOption === 'tomatoes'}
                onChange={() => setBeansOption('tomatoes')}
              /> Tomatoes
            </label><br />
            <label>
              <input
                type="radio"
                name={\`beans-\${item.name}\`}
                checked={beansOption === 'both'}
                onChange={() => setBeansOption('both')}
              /> Both (+£0.40)
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

      {/* 🌭 Hot Sandwich Extras */}
      {item.subcategory === 'Hot sandwiches' &&
        ['bacon muffin', 'sausage muffin', 'egg muffin', 'spam muffin'].some(v => item.name.toLowerCase().includes(v)) && (
          <div className="hot-options" style={{ marginTop: '1rem' }}>
            <p style={{ fontWeight: 600 }}>Extras:</p>
            {['egg', 'bacon', 'sausage', 'spam'].map((ingredient) => (
              <label key={ingredient}>
                <input
                  type="checkbox"
                  checked={hotAdditions[ingredient]}
                  onChange={() => handleHotChange(ingredient)}
                  disabled={item.name.toLowerCase().includes(ingredient)}
                /> Add {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
              </label>
            ))}
            <br />
            <label>
              <input
                type="checkbox"
                checked={toast}
                onChange={() => setToast(!toast)}
              /> Toast?
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
