import React, { useState } from 'react'
import MenuItemCard from './MenuItemCard'
import '../styles/custom.css'

const menuData = {
  food: {
    Breakfast: [
      { name: 'Small Breakfast', price: 9.99, image: '🍳' },
      { name: 'Large Breakfast', price: 12.5, image: '🥓' },
    ],
    "Hot sandwiches": [
      { name: 'Hot beef & onion', price: 9.99, image: '🍖' },
      { name: 'Hot chicken & stuffing', price: 12.5, image: '🍗' },
      { name: 'Sausage muffin', price: 12.5, image: '🌭' },
      { name: 'Bacon muffin', price: 3.9, image: '🥓' },
      { name: 'Egg muffin', price: 3.5, image: '🥚' },
      { name: 'Spam muffin', price: 4.0, image: '🥩' },
    ],
    "Cold sandwiches": [
      { name: 'Ham muffin', price: 3.8, image: '🥪' },
      { name: 'Chicken muffin', price: 3.8, image: '🥪' },
      { name: 'Prawn muffin', price: 4.2, image: '🦐' },
      { name: 'Beef muffin', price: 4.0, image: '🥩' },
      { name: 'Cheese muffin', price: 3.5, image: '🧀' },
      { name: 'Chicken Tikka muffin', price: 4.2, image: '🍗' },
      { name: 'Chicken & Bacon muffin', price: 4.4, image: '🥓' },
      { name: 'Egg Mayo muffin', price: 3.5, image: '🥚' },
      { name: 'Tuna Mayo muffin', price: 4.0, image: '🐟' },
    ],
    Toasties: [
      { name: 'Cheese & onion toastie', price: 4.5, image: '🧀' },
      { name: 'Cheese & tomato toastie', price: 4.2, image: '🍅' },
      { name: 'Cheese & tuna toastie', price: 4.6, image: '🐟' },
    ],
    "Plate salads": [
      { name: 'Ham plate salad', price: 5.2, image: '🥗' },
      { name: 'Beef plate salad', price: 5.6, image: '🥗' },
      { name: 'Prawn plate salad', price: 5.5, image: '🦐' },
      { name: 'Chicken plate salad', price: 5.5, image: '🍗' },
      { name: 'Tuna plate salad', price: 5.5, image: '🐟' },
    ],
    "Jacket potatoes": [
      { name: 'Jacket - Cheese & tuna', price: 6.2, image: '🥔' },
      { name: 'Jacket - Cheese & beans', price: 6.0, image: '🥔' },
      { name: 'Jacket - Cheese & chilli', price: 6.4, image: '🥔' },
      { name: 'Jacket - Chicken Curry', price: 6.5, image: '🍛' },
    ],
    Specials: [
      { name: 'Prawn special', price: 7.5, image: '🦐' },
      { name: 'Panini', price: 6.5, image: '🥖' },
    ],
    Cakes: [
      { name: 'Cream scone', price: 2.0, image: '🍰' },
      { name: 'Vanilla bun', price: 2.0, image: '🧁' },
      { name: 'Vanilla slice', price: 2.0, image: '🍮' },
      { name: 'Eclair', price: 2.0, image: '🍫' },
      { name: 'Meringue', price: 2.0, image: '🍥' },
      { name: 'Trifle', price: 2.0, image: '🍨' },
      { name: 'Manchester tart', price: 2.0, image: '🍓' },
      { name: 'Apple pie', price: 2.0, image: '🥧' },
      { name: 'Wimberry tart', price: 2.0, image: '🫐' },
      { name: 'Strawberry tart', price: 2.0, image: '🍓' },
      { name: 'Brownie', price: 2.0, image: '🍫' },
      { name: 'Jam slice', price: 2.0, image: '🍓' },
      { name: 'Flapjack', price: 2.0, image: '🥮' },
      { name: 'Shortbread', price: 2.0, image: '🍪' },
    ]
  },
  drinks: {
    "Hot Drinks": [
      { name: 'Cappuccino', price: 2.8, image: '☕' },
      { name: 'Latte', price: 2.9, image: '🥛' },
      { name: 'Tea', price: 2.0, image: '🍵' },
      { name: 'Coffee', price: 2.5, image: '☕' },
      { name: 'Black Coffee', price: 2.5, image: '☕' },
      { name: 'Americano', price: 2.8, image: '☕' },
      { name: 'Hot Chocolate', price: 3.0, image: '🍫' },
      { name: 'Mocha', price: 3.2, image: '☕' },
      { name: 'Fruit Tea', price: 2.2, image: '🍋' },
    ],
    Pop: [
      { name: 'Coke', price: 2.8, image: '🥤' },
      { name: 'Diet coke', price: 2.9, image: '🥤' },
      { name: 'Fanta', price: 2.9, image: '🥤' },
      { name: 'Sprite', price: 2.9, image: '🥤' },
      { name: 'Irn bru', price: 2.9, image: '🥤' },
    ],
    Juice: [
      { name: 'Fresh Orange', price: 2.0, image: '🧃' },
      { name: 'Vimto', price: 2.0, image: '🧃' },
      { name: 'Orange fruit shoot', price: 2.0, image: '🧃' },
      { name: 'Blackcurrant fruit shoot', price: 2.0, image: '🧃' },
    ]
  }
}


function MenuTabs() {
  const [activeTab, setActiveTab] = useState('food')
  const [activeSub, setActiveSub] = useState(Object.keys(menuData.food)[0])
  const [search, setSearch] = useState('')

  const handleMainTab = (tab) => {
    setActiveTab(tab)
    setActiveSub(Object.keys(menuData[tab])[0])
    setSearch('')
  }

  const currentItems = menuData[activeTab][activeSub].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="menu-tabs-wrapper">
      {/* Main Tabs */}
      <div className="tab-buttons">
        {['food', 'drinks'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleMainTab(tab)}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'food' ? '🍽️ Food' : '🥤 Drinks'}
          </button>
        ))}
      </div>

      {/* Sub-tabs */}
      <div className="sub-tab-buttons">
        {Object.keys(menuData[activeTab]).map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSub(sub)}
            className={`sub-tab-btn ${activeSub === sub ? 'active' : ''}`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder={`Search ${activeSub}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="menu-search"
      />

      {/* Grid */}
      <div className="menu-grid">
        {currentItems.map((item, i) => (
          <MenuItemCard key={i} item={{ ...item, category: activeTab, subcategory: activeSub }} />
        ))}
      </div>
    </div>
  )
}

export default MenuTabs
