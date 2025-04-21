import React, { useState } from 'react'
import MenuItemCard from './MenuItemCard'
import '../styles/custom.css'

const menuData = {
  food: {
    Breakfast: [
      { name: 'Small Breakfast', price: 9.99, image: '🍳' },
      { name: 'Large Breakfast', price: 12.5, image: '🥓' },
    ],
    Hot sandwiches: [
      { name: 'Hot beef & onion', price: 9.99, image: '🍳' },
      { name: 'Hot chicken & stuffin', price: 12.5, image: '🥓' },
      { name: 'Sausage muffin', price: 12.5, image: '🥓' },
    ],
    Cold sandwiches: [
      { name: 'Ham muffin', price: 9.99, image: '🍳' },
      { name: 'Chicken muffin', price: 12.5, image: '🥓' },
    ],
    Toasties: [
      { name: 'Cheese & onion toastie', price: 0.9, image: '🍳' },
      { name: 'Cheese & tomato toastie', price: 12.5, image: '🥓' },
    ],
    Plate salads: [
      { name: 'Ham plate salad', price: 0.9, image: '🍳' },
      { name: 'Beef plate salad', price: 12.5, image: '🥓' },
    ],
    Jacket potato: [
      { name: 'Jacket - cheese & tuna', price: 0.9, image: '🍳' },
      { name: 'Jacket - cheese & beans', price: 12.5, image: '🥓' },
      { name: 'Jacket - cheese & chilli', price: 12.5, image: '🥓' },
    ],
    Specials: [
      { name: 'Prawn special', price: 0.9, image: '🍳' },
      { name: 'Panini', price: 12.5, image: '🥓' },
    ],
    Cakes: [
      { name: 'Cream scone', price: 2.0, image: '🍰' },
      { name: 'Vanilla bun', price: 2.0, image: '🍰' },
      { name: 'Vanilla slice', price: 2.0, image: '🍰' },
    ]
  },
  drinks: {
    Coffee: [
      { name: 'Cappuccino', price: 2.8, image: '☕' },
      { name: 'Latte', price: 2.9, image: '🥛' },
    ],
    Pop: [
      { name: 'Coke', price: 2.8, image: '☕' },
      { name: 'Diet coke', price: 2.9, image: '🥛' },
      { name: 'Fanta', price: 2.9, image: '🥛' },
      { name: 'Sprite', price: 2.9, image: '🥛' },
      { name: 'Irn bru', price: 2.9, image: '🥛' },
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
    setActiveSub(Object.keys(menuData[tab])[0]) // default to first sub
    setSearch('')
  }

  const allSubTabs = Object.keys(menuData[activeTab])
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
        {allSubTabs.map((sub) => (
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

      {/* Menu Grid */}
      <div className="menu-grid">
        {currentItems.map((item, i) => (
          <MenuItemCard key={i} item={{ ...item, category: activeTab }} />
        ))}
      </div>
    </div>
  )
}

export default MenuTabs
