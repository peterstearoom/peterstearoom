import React, { useState } from 'react'
import MenuItemCard from './MenuItemCard'

const menuData = {
  food: [
    { name: 'Cheeseburger', price: 8.99 },
    { name: 'Salad Bowl', price: 6.5 }
  ],
  drinks: [
    { name: 'Coffee', price: 2.2 },
    { name: 'Tea', price: 2.0 }
  ]
}

function MenuTabs() {
  const [activeTab, setActiveTab] = useState('food')

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {['food', 'drinks'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menuData[activeTab].map((item, i) => (
          <MenuItemCard key={i} item={{ ...item, category: activeTab }} />
        ))}
      </div>
    </div>
  )
}

export default MenuTabs
