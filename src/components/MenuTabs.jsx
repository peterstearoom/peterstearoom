import React, { useState } from 'react'
import MenuItemCard from './MenuItemCard'

const menuData = {
  food: [
    { name: 'Small Breakfast', price: 9.99 },
    { name: 'Large Breakfast', price: 6.0 },
    { name: 'Teacake', price: 2.0 }
  ],
  drinks: [
    { name: 'Cappuccino', price: 2.8 },
    { name: 'Latte', price: 2.9 },
    { name: 'Orange Juice', price: 2.0 }
  ]
}

function MenuTabs() {
  const [activeTab, setActiveTab] = useState('food')
  const [search, setSearch] = useState('')

  const filteredItems = menuData[activeTab].filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
<div className="grid grid-cols-2 gap-4 mb-6">
  {['food', 'drinks'].map((tab) => (
    <button
      key={tab}
      onClick={() => {
        setSearch('')
        setActiveTab(tab)
      }}
      className={`w-full py-3 rounded-2xl shadow-md text-lg font-semibold tracking-wide transition-all duration-200 ${
        activeTab === tab
          ? 'bg-green-600 text-white'
          : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100'
      }`}
    >
      {tab === 'food' ? '🍽️ Food' : '🥤 Drinks'}
    </button>
  ))}
</div>

      <input
        type="text"
        placeholder={`Search ${activeTab}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-1 rounded w-full mb-4"
      />

      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map((item, i) => (
          <MenuItemCard key={i} item={{ ...item, category: activeTab }} />
        ))}
      </div>
    </div>
  )
}

export default MenuTabs
