import React, { useState } from 'react'
import MenuCard from './MenuCard'
import MenuItemCard from './MenuItemCard'
import '../styles/custom.css'

const menuData = {
  food: [
    { name: 'Small Breakfast', price: 9.99, image: '🍳' },
    { name: 'Large Breakfast', price: 12.5, image: '🥓' },
    { name: 'Teacake', price: 2.0, image: '🍰' },
  ],
  drinks: [
    { name: 'Cappuccino', price: 2.8, image: '☕' },
    { name: 'Latte', price: 2.9, image: '🥛' },
    { name: 'Orange Juice', price: 2.0, image: '🧃' },
  ]
}

function MenuTabs() {
  const [activeTab, setActiveTab] = useState('food')
  const [search, setSearch] = useState('')

  const filteredItems = menuData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="menu-tabs-wrapper">
      {/* Tabs */}
      <div className="tab-buttons">
        {['food', 'drinks'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSearch('')
              setActiveTab(tab)
            }}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab === 'food' ? '🍽️ Food' : '🥤 Drinks'}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder={`Search ${activeTab}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="menu-search"
      />

      {/* Grid */}
      <div className="menu-grid">
        {filteredItems.map((item, i) => (
          <MenuItemCard key={i} item={{ ...item, category: activeTab }} />
        ))}
      </div>
    </div>
  )
}

export default MenuTabs
