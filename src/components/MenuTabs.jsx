import React, { useState } from 'react'
import MenuItemCard from './MenuItemCard'
import '../styles/custom.css'

const menuData = {
  food: {
    Breakfasts: [
      { name: 'Small breakfast', price: 4.8, image: '🍳' },
      { name: 'Large breakfast', price: 6.5, image: '🥓' },
      { name: 'Toast', price: .9, image: '🥪' },
      { name: 'Teacake', price: 2.3, image: '🧆' },
      { name: 'Crumpets', price: 2.2, image: '🧆' },
    ],
    "Hot sandwiches": [
      { name: 'Hot beef & onion', price: 4.5, image: '🍖' },
      { name: 'Hot chicken & stuffing', price: 4.5, image: '🍗' },
      { name: 'Sausage muffin', price: 3.8, image: '🌭' },
      { name: 'Bacon muffin', price: 3.8, image: '🥓' },
      { name: 'Egg muffin', price: 3.5, image: '🥚' },
      { name: 'Spam muffin', price: 3.3, image: '🥩' },
      { name: 'BLT', price: 4.1, image: '🥓' },
    ],
    "Cold sandwiches": [
      { name: 'Ham muffin', price: 4.2, image: '🥪' },
      { name: 'Chicken muffin', price: 4.2, image: '🥪' },
      { name: 'Prawn muffin', price: 4.5, image: '🦐' },
      { name: 'Beef muffin', price: 4.2, image: '🥩' },
      { name: 'Cheese muffin', price: 4, image: '🧀' },
      { name: 'Salad muffin', price: 3.8, image: '🧀' },
      { name: 'Chicken Tikka muffin', price: 4.2, image: '🍗' },
      { name: 'Chicken & Bacon muffin', price: 4.2, image: '🥓' },
      { name: 'Egg Mayo muffin', price: 4, image: '🥚' },
      { name: 'Tuna Mayo muffin', price: 4, image: '🐟' },
    ],
    Toasties: [
      { name: 'Cheese toastie', price: 4.5, image: '🧀' },
    ],
    "Plate salads": [
      { name: 'Ham plate salad', price: 6.5, image: '🥗' },
      { name: 'Beef plate salad', price: 6.5, image: '🥗' },
      { name: 'Prawn plate salad', price: 7.3, image: '🦐' },
      { name: 'Cheese plate salad', price: 6.5, image: '🧀' },
      { name: 'Chicken plate salad', price: 6.5, image: '🍗' },
      { name: 'Tuna plate salad', price: 6.5, image: '🐟' },
    ],
    "Pies/Soups": [
      { name: 'Meat & potato', price: 5.5, image: '🥧' },
      { name: 'Cottage pie', price: 5.5, image: '🥧' },
      { name: 'Rag pudding', price: 5.5, image: '🥧' },
      { name: 'Cheese & onion', price: 5.5, image: '🥧' },
      { name: 'Meat & onion', price: 5.5, image: '🥧' },
      { name: 'Pea & ham soup', price: 5.5, image: '🥘' },
      { name: 'Tomato soup', price: 5.5, image: '🥘' },
    ],
    "Burgers/Hotdogs": [
      { name: 'Beef burger', price: 4.3, image: '🍔' },
      { name: 'Hotdog', price: 3.6, image: '🌭' },
    ],
    "Jacket potatoes": [
      { name: 'Jacket - Cheese', price: 5.2, image: '🥔' },
      { name: 'Jacket - Beans', price: 5.2, image: '🥔' },
      { name: 'Jacket - Tuna', price: 5.2, image: '🥔' },
      { name: 'Jacket - Chilli', price: 5.2, image: '🥔' },
      { name: 'Jacket - Curry', price: 5.2, image: '🥔' },
      { name: 'Jacket - Coleslaw', price: 5.2, image: '🥔' },
    ],
    Specials: [
      { name: 'Prawn special', price: 5.9, image: '🦐' },
      { name: 'Black pudding', price: 3.4, image: '🧆' },
      { name: 'Chips', price: 2.8, image: '🍟' },
      { name: 'Cheese on toast', price: 3.5, image: '🧀' },
      { name: 'Beans on toast', price: 3.5, image: '🍝' },
      { name: 'Cream tea', price: 3.9, image: '🍯' },
    ],
    Cakes: [
      { name: 'Cream scone', price: 2.5, image: '🍰' },
      { name: 'Vanilla bun', price: 2.2, image: '🧁' },
      { name: 'Vanilla slice', price: 2.2, image: '🍮' },
      { name: 'Eclair', price: 2.5, image: '🍫' },
      { name: 'Meringue', price: 2.5, image: '🍥' },
      { name: 'Trifle', price: 2.5, image: '🍨' },
      { name: 'Manchester tart', price: 2.5, image: '🍓' },
      { name: 'Apple pie', price: 3.8, image: '🥧' },
      { name: 'Chocolate cake', price: 3.8, image: '🍫' },
      { name: 'Carrot cake', price: 3.6, image: '🍰' },
      { name: 'Red velvet cake', price: 3.6, image: '🍰' },
      { name: 'Wimberry tart', price: 4.8, image: '🫐' },
      { name: 'Strawberry tart', price: 4.8, image: '🍓' },
      { name: 'Brownie', price: 2.1, image: '🍫' },
      { name: 'Custard tart', price: 2.1, image: '🍮' },
      { name: 'Jam slice', price: 2.1, image: '🍓' },
      { name: 'Flapjack', price: 2.1, image: '🥮' },
      { name: 'Millionaire Shortbread', price: 2.1, image: '🍪' },
      { name: 'Chorley cake', price: 2.0, image: '🍪' },
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
