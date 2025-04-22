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
  const [mushroom, setMushroom] = useState(false)
  const [toast, setToast] = useState(false)
  const [creamTeaSelection, setCreamTeaSelection] = useState('')
  const [hotAdditions, setHotAdditions] = useState({
    egg: false, bacon: false, sausage: false, spam: false
  })
const [hotDrinkExtras, setHotDrinkExtras] = useState({
  hotMilk: false,
  coldMilk: false,
  trimmings: false,
  extraShot: false,
  teaType: ''
})

 const [pieExtras, setPieExtras] = useState({
  peas: false,
  beans: false,
  gravy: false,
  chips: false
 })
  const [burgerExtras, setBurgerExtras] = useState({
    cheese: false, onions: false, chips: false
  })
  const [jacketExtras, setJacketExtras] = useState({
    cheese: false,
    tuna: false,
    beans: false,
    coleslaw: false,
    chickenCurry: false,
    chilli: false
  })
const [cakeExtras, setCakeExtras] = useState({
  hot: false,
  cream: false
})
const [specialsExtras, setSpecialsExtras] = useState({
  cheese: false,
  gravy: false
})

  const [toastieExtras, setToastieExtras] = useState({
    tomato: false, onion: false, ham: false, tuna: false
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
      if (mushroom) {
        extras.push('mushroom')
        finalPrice += 0.9
      }
      if (extras.length > 0) finalName += ` (${extras.join(' + ')})`
    }
// ☕️ Hot Drinks logic
if (item.subcategory === 'Hot Drinks') {
  const itemName = item.name.toLowerCase()

  // Americano: hot/cold milk (mutually exclusive)
  if (itemName === 'americano') {
    if (hotDrinkExtras.hotMilk) finalName += ' (hot milk)'
    else if (hotDrinkExtras.coldMilk) finalName += ' (cold milk)'
  }

  // Hot chocolate: trimmings
  if (itemName === 'hot chocolate' && hotDrinkExtras.trimmings) {
    finalName += ' (trimmings)'
  }

  // Coffee drinks: extra shot
  if (['cappuccino', 'latte', 'coffee', 'black coffee'].includes(itemName)) {
    if (hotDrinkExtras.extraShot) {
      finalName += ' (extra shot)'
      finalPrice += 1.9
    }
  }

  // Fruit tea options
  if (itemName === 'fruit tea' && hotDrinkExtras.teaType) {
    finalName = `${hotDrinkExtras.teaType} tea`
  }
}

// ☕️ Cream Tea addition logic for "Tea" in Hot Drinks
if (
  item.subcategory === 'Hot Drinks' &&
  item.name.toLowerCase() === 'tea' &&
  ['cream scone', 'eclair', 'meringue', 'trifle'].includes(creamTeaSelection)
) {
  const formatted = creamTeaSelection.charAt(0).toUpperCase() + creamTeaSelection.slice(1)
  finalName = `Cream tea (${formatted})`
  finalPrice += 2.10
}


// 🍰 Cakes Logic
if (item.subcategory === 'Cakes') {
  const itemName = item.name.toLowerCase()
  const creamTeaItems = ['cream scone', 'eclair', 'meringue', 'trifle']
  const hotCreamItems = ['apple pie', 'chocolate cake', 'brownie']
  const creamOnlyItems = ['carrot cake', 'red velvet cake']

  // Hot/Cream combos
  if (hotCreamItems.includes(itemName)) {
    if (cakeExtras.hot) finalName = `Hot ${finalName}`
    if (cakeExtras.cream) finalName += ' with cream'
  }

  if (creamOnlyItems.includes(itemName) && cakeExtras.cream) {
    finalName += ' with cream'
  }
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


    // 🧀 Toastie Logic (only for Cheese toastie)
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

// 🍟 Specials -> Chips Logic
if (
  item.subcategory === 'Specials' &&
  item.name.toLowerCase() === 'chips'
) {
  const selected = []
  if (specialsExtras.cheese) {
    selected.push('cheese')
    finalPrice += 0.9
  }
  if (specialsExtras.gravy) {
    selected.push('gravy')
    finalPrice += 0.6
  }

  if (selected.length > 0) {
    finalName += ` (${selected.join(', ')})`
  }
}


    // Jacket Potatoes Logic
    if (item.subcategory === 'Jacket potatoes' && item.name.toLowerCase() === 'jacket potato') {
      const selected = Object.entries(jacketExtras).filter(([_, v]) => v).map(([k]) => {
        if (k === 'chickenCurry') return 'chicken curry'
        return k
      })

      if (selected.length > 0) {
        finalName += ` (${selected.join(', ')})`
        finalPrice += (selected.length - 1) * 1.4
      }
    }

// 🥧 Pies/Soups Logic
if (
  item.subcategory === 'Pies/Soups' &&
  ['meat & potato pie', 'cottage pie', 'rag pudding', 'cheese & onion pie', 'meat & onion pie']
    .some(name => item.name.toLowerCase().includes(name))
) {
  let extras = []

  if (pieExtras.peas) extras.push('peas')
  if (pieExtras.beans) extras.push('beans')
  if (pieExtras.gravy) extras.push('gravy')

  if (extras.length > 0) {
    finalName += `, ${extras.join(', ')}`
  }

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
    setMushroom(false)
    setToast(false)
    setCreamTeaSelection('')
    setHotAdditions({ egg: false, bacon: false, sausage: false, spam: false })
    setToastieExtras({ tomato: false, onion: false, ham: false, tuna: false })
    setPieExtras({ peas: false, beans: false, gravy: false, chips: false })
    setBurgerExtras({ cheese: false, onions: false, chips: false })
    setCakeExtras({ hot: false, cream: false })
    setHotDrinkExtras({
 	 hotMilk: false,
  	coldMilk: false,
  	trimmings: false,
 	 extraShot: false,
 	 teaType: ''
	})

    setJacketExtras({
      cheese: false,
      tuna: false,
      beans: false,
      coleslaw: false,
      chickenCurry: false,
      chilli: false
    })
    setSpecialsExtras({ cheese: false, gravy: false })

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

      {/* 🥗 Cold Sandwich Options */}
      {item.subcategory === 'Cold sandwiches' && (
        <>
          <label>
            <input type="checkbox" checked={addSalad}
              onChange={() => {
                setAddSalad(!addSalad)
                if (!addSalad) setAddOnions(false)
              }} />
            Add salad? (+£1.50)
          </label><br />
          {addSalad && (
            <label>
              <input type="checkbox" checked={addOnions}
                onChange={() => setAddOnions(!addOnions)} />
              Add onions?
            </label>
          )}
        </>
      )}
{/* ☕️ Hot Drinks Options */}
{item.subcategory === 'Hot Drinks' && (
  <div className="hot-drinks-options" style={{ marginTop: '1rem' }}>
    <p style={{ fontWeight: 600 }}>Drink Options:</p>

    {/* Americano: Hot/Cold milk */}
    {item.name.toLowerCase() === 'americano' && (
      <>
        <label>
          <input
            type="checkbox"
            checked={hotDrinkExtras.hotMilk}
            onChange={() =>
              setHotDrinkExtras(prev => ({
                ...prev,
                hotMilk: !prev.hotMilk,
                coldMilk: false
              }))
            }
          /> Hot milk
        </label><br />
        <label>
          <input
            type="checkbox"
            checked={hotDrinkExtras.coldMilk}
            onChange={() =>
              setHotDrinkExtras(prev => ({
                ...prev,
                coldMilk: !prev.coldMilk,
                hotMilk: false
              }))
            }
          /> Cold milk
        </label>
      </>
    )}

    {/* Hot Chocolate: Trimmings */}
    {item.name.toLowerCase() === 'hot chocolate' && (
      <label>
        <input
          type="checkbox"
          checked={hotDrinkExtras.trimmings}
          onChange={() =>
            setHotDrinkExtras(prev => ({ ...prev, trimmings: !prev.trimmings }))
          }
        /> Trimmings
      </label>
    )}

    {/* Extra Shot */}
    {['cappuccino', 'latte', 'coffee', 'black coffee'].includes(item.name.toLowerCase()) && (
      <label>
        <input
          type="checkbox"
          checked={hotDrinkExtras.extraShot}
          onChange={() =>
            setHotDrinkExtras(prev => ({ ...prev, extraShot: !prev.extraShot }))
          }
        /> Extra shot (+£1.90)
      </label>
    )}

    {/* Fruit Tea Flavours */}
    {item.name.toLowerCase() === 'fruit tea' && (
      <>
        {['earl grey', 'lemon & ginger', 'camomile', 'cranberry'].map(type => (
          <label key={type}>
            <input
              type="radio"
              name={`fruit-tea-${item.name}`}
              checked={hotDrinkExtras.teaType === type}
              onChange={() => setHotDrinkExtras(prev => ({ ...prev, teaType: type }))}
            /> {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </>
    )}
  </div>
)}
    {/* Cream Tea options */}
{item.subcategory === 'Hot Drinks' && item.name.toLowerCase() === 'tea' && (
  <div className="hot-drinks-extras" style={{ marginTop: '1rem' }}>
    <p style={{ fontWeight: 600 }}>Cream Tea Extras:</p>
    {['cream scone', 'eclair', 'meringue', 'trifle'].map((dessert) => (
      <label key={dessert} style={{ display: 'block' }}>
        <input
          type="radio"
          name={`cream-tea-${item.name}`}
          value={dessert}
          checked={creamTeaSelection === dessert}
          onChange={(e) => setCreamTeaSelection(e.target.value)}
        />
        Add {dessert.charAt(0).toUpperCase() + dessert.slice(1)} (+£2.10)
      </label>
    ))}
  </div>
)}


{/* 🍟 Specials Extras */}
{item.subcategory === 'Specials' && item.name.toLowerCase() === 'chips' && (
  <div className="specials-options" style={{ marginTop: '1rem' }}>
    <p style={{ fontWeight: 600 }}>Extras:</p>
    <label>
      <input
        type="checkbox"
        checked={specialsExtras.cheese}
        onChange={() =>
          setSpecialsExtras(prev => ({ ...prev, cheese: !prev.cheese }))
        }
      /> Add cheese (+£0.90)
    </label><br />
    <label>
      <input
        type="checkbox"
        checked={specialsExtras.gravy}
        onChange={() =>
          setSpecialsExtras(prev => ({ ...prev, gravy: !prev.gravy }))
        }
      /> Add gravy (+£0.60)
    </label>
  </div>
)}

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
{/* 🍰 Cakes Extras */}
{item.subcategory === 'Cakes' && (
  <div className="cake-options" style={{ marginTop: '1rem' }}>
    <p style={{ fontWeight: 600 }}>Cake Extras:</p>

    {/* Hot & Cream combos */}
    {['apple pie', 'chocolate cake', 'brownie'].includes(item.name.toLowerCase()) && (
      <>
        <label>
          <input
            type="checkbox"
            checked={cakeExtras.hot}
            onChange={() => setCakeExtras(prev => ({ ...prev, hot: !prev.hot }))}
          /> Hot
        </label><br />
        <label>
          <input
            type="checkbox"
            checked={cakeExtras.cream}
            onChange={() => setCakeExtras(prev => ({ ...prev, cream: !prev.cream }))}
          /> Cream
        </label>
      </>
    )}

    {/* Cream only */}
    {['carrot cake', 'red velvet cake'].includes(item.name.toLowerCase()) && (
      <label>
        <input
          type="checkbox"
          checked={cakeExtras.cream}
          onChange={() => setCakeExtras(prev => ({ ...prev, cream: !prev.cream }))}
        /> Cream
      </label>
    )}
  </div>
)}


      {/* 🥔 Jacket Potato Extras */}
      {item.subcategory === 'Jacket potatoes' && item.name.toLowerCase() === 'jacket potato' && (
        <div className="jacket-options" style={{ marginTop: '1rem' }}>
          <p style={{ fontWeight: 600 }}>Choose your toppings:</p>
          {Object.entries(jacketExtras).map(([key, value]) => {
            const label = key === 'chickenCurry' ? 'Chicken curry' : key.charAt(0).toUpperCase() + key.slice(1)
            const selectedCount = Object.values(jacketExtras).filter(v => v).length
            const priceLabel = selectedCount > 0 ? ' (+£1.40)' : ''
            return (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setJacketExtras(prev => ({ ...prev, [key]: !prev[key] }))}
                /> {label}{priceLabel}
              </label>
            )
          })}
        </div>
      )}

      {/* 🍳 Breakfast Options */}
      {item.subcategory === 'Breakfasts' &&
        (item.name.toLowerCase().includes('small breakfast') || item.name.toLowerCase().includes('large breakfast')) && (
          <div className="breakfast-options" style={{ marginTop: '1rem' }}>
            <p style={{ fontWeight: 600 }}>Breakfast Extras:</p>
            {['beans', 'tomatoes', 'both'].map(opt => (
              <label key={opt}>
                <input type="radio" name={`beans-${item.name}`} checked={beansOption === opt}
                  onChange={() => setBeansOption(opt)} />
                {opt.charAt(0).toUpperCase() + opt.slice(1)} {opt === 'both' ? '(+£0.40)' : ''}
              </label>
            ))}
            <br />
            <label>
              <input type="checkbox" checked={blackPud} onChange={() => setBlackPud(!blackPud)} />
              Add black pudding (+£1.40)
            </label>
            <label>
              <input type="checkbox" checked={mushroom} onChange={() => setMushroom(!mushroom)} />
              Add mushrooms (+£0.90)
            </label>
          </div>
      )}
{/* 🥧 Pie Extras */}
{item.subcategory === 'Pies/Soups' &&
  ['meat & potato pie', 'cottage pie', 'rag pudding', 'cheese & onion pie', 'meat & onion pie']
    .some(name => item.name.toLowerCase().includes(name)) && (
      <div className="pie-options" style={{ marginTop: '1rem' }}>
        <p style={{ fontWeight: 600 }}>Pie Extras:</p>
        <label>
          <input
            type="checkbox"
            checked={pieExtras.peas}
            onChange={() =>
              setPieExtras(prev => ({
                ...prev,
                peas: !prev.peas,
                beans: prev.peas ? prev.beans : false
              }))
            }
          /> Add Peas
        </label><br />
        <label>
          <input
            type="checkbox"
            checked={pieExtras.beans}
            onChange={() =>
              setPieExtras(prev => ({
                ...prev,
                beans: !prev.beans,
                peas: prev.beans ? prev.peas : false
              }))
            }
          /> Add Beans
        </label><br />
        <label>
          <input
            type="checkbox"
            checked={pieExtras.gravy}
            onChange={() => setPieExtras(prev => ({ ...prev, gravy: !prev.gravy }))}
          /> Add Gravy
        </label><br />
        <label>
          <input
            type="checkbox"
            checked={pieExtras.chips}
            onChange={() => setPieExtras(prev => ({ ...prev, chips: !prev.chips }))}
          /> Add Chips (+£2.30)
        </label>
      </div>
)}


      {/* 🌭 Hot Sandwich Extras */}
      {item.subcategory === 'Hot sandwiches' &&
        ['bacon muffin', 'sausage muffin', 'egg muffin', 'spam muffin'].some(v => item.name.toLowerCase().includes(v)) && (
          <div className="hot-options" style={{ marginTop: '1rem' }}>
            <p style={{ fontWeight: 600 }}>Extras:</p>
            {['egg', 'bacon', 'sausage', 'spam'].map(ingredient => (
              <label key={ingredient}>
                <input type="checkbox" checked={hotAdditions[ingredient]}
                  onChange={() => handleHotChange(ingredient)}
                  disabled={item.name.toLowerCase().includes(ingredient)} />
                Add {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
              </label>
            ))}
            <br />
            <label>
              <input type="checkbox" checked={toast} onChange={() => setToast(!toast)} />
              On toast
            </label>
          </div>
      )}

      {/* 🧀 Cheese Toastie Extras */}
      {item.subcategory === 'Toasties' && item.name.toLowerCase() === 'cheese toastie' && (
        <div className="toastie-options" style={{ marginTop: '1rem' }}>
          <p style={{ fontWeight: 600 }}>Toastie Extras:</p>
          {['tomato', 'onion', 'ham', 'tuna'].map(extra => (
            <label key={extra}>
              <input
                type="checkbox"
                checked={toastieExtras[extra]}
                onChange={() => handleToastieChange(extra)}
              /> Add {extra.charAt(0).toUpperCase() + extra.slice(1)} {['ham', 'tuna'].includes(extra) && '(+£0.70)'}
            </label>
          ))}
        </div>
      )}

      <button onClick={handleAdd} className="item-add-btn">
        ➕ Add to Order
      </button>
    </div>
  )
}

export default MenuItemCard
