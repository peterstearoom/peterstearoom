import React, { useState } from 'react'
import MenuCard from './MenuCard'
import MenuItemCard from './MenuItemCard'


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
    <div>
      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-4">
        {['food', 'drinks'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSearch('')
              setActiveTab(tab)
            }}
            className={`px-4 py-2 rounded-full font-bold transition-all shadow-sm text-sm
              ${activeTab === tab
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
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
        className="border px-3 py-2 rounded w-full mb-4 shadow-sm"
      />

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item, i) => (
          <MenuItemCard key={i} item={{ ...item, category: activeTab }} />
        ))}
      </div>
    </div>
  )
}

export default MenuTabs
