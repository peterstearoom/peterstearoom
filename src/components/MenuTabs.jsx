import React, { useState } from 'react'
import MenuItemCard from './MenuItemCard'

const menuData = {
  food: [
    { name: 'Full English Breakfast', price: 9.99 },
    { name: 'Toasted Panini', price: 6.0 },
    { name: 'Soup of the Day', price: 4.5 }
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
      <div className="flex gap-2 mb-3">
        {['food', 'drinks'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSearch('')
              setActiveTab(tab)
            }}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            {tab.toUpperCase()}
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
