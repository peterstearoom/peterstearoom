import React from 'react'
import MenuTabs from '../components/MenuTabs'
import OrderCart from '../components/OrderCart'

function WaiterScreen() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
<h1 className="text-3xl font-bold mb-6 text-center font-serif text-gray-800">
  🍽️Peter's Tea Room🍽️
</h1>
      <MenuTabs />
      <OrderCart />
    </div>
  )
}

export default WaiterScreen
