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
    egg: false, bacon: false, sausage: false, spam: false
  })
  const [pieExtras, setPieExtras] = useState({
    peas: false, beans: false, gravy: false, chips: false
  })
  const [toastieExtras, setToastieExtras] = useState({
    tomato: false, onion: false, ham: false, tuna: false
  })
  const [burgerExtras, setBurgerExtras] = useState({
    cheese: false, onions: false, chips: false
  })

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

    // 🍳 Breakfast logic
    if (item.subcategory === 'Breakfasts' &&
      (item.name.toLowerCase().includes('small breakfast') || item.name.toLowerCase().includes('large breakfast'))) {
      let extras = []
      if (beansOption) {
        if (beansOption === 'both') finalPrice += 0.4
        extras.push(beansOption)
      }
      if (blackPud) {
        extras.push('black pud')
        finalPrice += 1.4
      }
      if (extras.length > 0) finalName += ` (${extras.join(' + ')})`
    }

    // 🌭 Hot Sandwich logic
    if (item.subcategory === 'Hot sandwiches' &&
      ['bacon muffin', 'sausage muffin', 'egg muffin', 'spam muffin'].some(v => item.name.toLowerCase().includes(v))) {
      const selected = Object.entries(hotAdditions)
        .filter(([key, value]) => value && !item.name.toLowerCase().includes(key))
        .map(([key]) => key)

      if (toast) finalName = finalName.replace('muffin', 'on toast')

      if (selected.length) {
        const additions = selected.join(', ')
        finalName = `${finalName.split(' ')[0]}, ${additions} ${toast ? 'on toast' : 'muffin'}`
        if (selected.length === 1) finalPrice += 0.7
        if (selected.length === 2) finalPrice += 1.0
        if (selected.length >= 3) finalPrice += 1.3
      }
    }

    // 🧀 Toastie logic
    if (item.subcategory === 'Toasties' && item.name.toLowerCase() === 'cheese toastie') {
      let additions = ['cheese']
      if (toastieExtras.ham) {
        additions.push('ham')
        finalPrice += 0.7
      }
      if (toastieExtras.tuna) {
        additions.push('tuna')
        finalPrice += 0.7
      }
      if (toastieExtras.tomato) additions.push('tomato')
      if (toastieExtras.onion) additions.push('onion')
      finalName = `${additions.join(', ')} toastie`
    }

    // 🥧 Pies/Soups logic
    if (
      item.subcategory === 'Pies/Soups' &&
      ['meat & potato pie', 'cottage pie', 'rag pudding', 'cheese & onion pie', 'meat & onion pie']
        .some(name => item.name.toLowerCase().includes(name))
    ) {
      let extras = []
      if (pieExtras.peas) extras.push('peas')
      if (pieExtras.beans) extras.push('beans')
      if (pieExtras.gravy) extras.push('gravy')
      if (extras.length > 0) finalName += `, ${extras.join(', ')}`
      if (pieExtras.chips) {
        finalName += ` (Chips)`
        finalPrice += 2.3
      }
    }

    // 🍔 Burger/Hotdog logic
    if (item.subcategory === 'Burgers/Hotdogs') {
      const isBurger = item.name.toLowerCase().includes('burger')
      const isHotdog = item.name.toLowerCase().includes('hotdog')

      let burgerName = item.name
      let extras = []

      if (burgerExtras.cheese) {
        if (isBurger) {
          burgerName = burgerName.replace(/beef/i, 'Cheese')
          finalPrice += 0.2
        }
        if (isHotdog) {
          extras.push('cheese')
          finalPrice += 0.2
        }
      }

      if (burgerExtras.onions) {
        if (isBurger) {
          burgerName += ', onions'
        }
        if (isHotdog) {
          extras.push('onions')
        }
      }

      if (extras.length > 0 && isHotdog) {
        burgerName += `, ${extras.join(', ')}`
      }

      if (burgerExtras.chips) {
        burgerName += ` (Chips)`
        finalPrice += 2.3
      }

      finalName = burgerName
    }

    addItem({ ...item, name: finalName, price: finalPrice, qty, note })

    // Reset all
    setQty(1)
    setNote('')
    setAddSalad(false)
    setAddOnions(false)
    setBeansOption('')
    setBlackPud(false)
    setToast(false)
    setHotAdditions({ egg: false, bacon: false, sausage: false, spam: false })
    setToastieExtras({ tomato: false, onion: false, ham: false, tuna: false })
    setPieExtras({ peas: false, beans: false, gravy: false, chips: false })
    setBurgerExtras({ cheese: false, onions: false, chips: false })
  }

  const handleHotChange = (key) => {
    setHotAdditions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleToastieChange = (key) => {
    setToastieExtras(prev => ({ ...prev, [key]: !prev[key] }))
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

      {/* 🍔 Burger/Hotdog Extras */}
      {item.subcategory === 'Burgers/Hotdogs' && (
        <div className="burger-options" style={{ marginTop: '1rem' }}>
          <p style={{ fontWeight: 600 }}>Extras:</p>
          <label>
            <input
              type="checkbox"
              checked={burgerExtras.cheese}
              onChange={() => setBurgerExtras(prev => ({ ...prev, cheese: !prev.cheese }))}
            /> Add Cheese (+£0.20)
          </label><br />
          <label>
            <input
              type="checkbox"
              checked={burgerExtras.onions}
              onChange={() => setBurgerExtras(prev => ({ ...prev, onions: !prev.onions }))}
            /> Add Onions
          </label><br />
          <label>
            <input
              type="checkbox"
              checked={burgerExtras.chips}
              onChange={() => setBurgerExtras(prev => ({ ...prev, chips: !prev.chips }))}
            /> Add Chips (+£2.30)
          </label>
        </div>
      )}

      {/* Add your other sections (Cold sandwiches, Breakfast, Pies, Toasties, Hot Sandwiches) below */}
      {/* Skipped to keep focus on burger logic */}
      
      <button onClick={handleAdd} className="item-add-btn">
        ➕ Add to Order
      </button>
    </div>
  )
}

export default MenuItemCard
