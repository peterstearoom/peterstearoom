import React from 'react'
import MenuTabs from '../components/MenuTabs'
import OrderCart from '../components/OrderCart'

function WaiterScreen() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🍽️ Waiter Order System</h1>
      <MenuTabs />
      <OrderCart />
    </div>
  )
}

export default WaiterScreen
