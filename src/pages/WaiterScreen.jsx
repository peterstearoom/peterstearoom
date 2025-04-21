import React from 'react'
import MenuTabs from '../components/MenuTabs'
import OrderCart from '../components/OrderCart'

function WaiterScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f6f3] to-[#e2dfd7] text-gray-800 py-6 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-emerald-700 mb-2 drop-shadow-sm">
          🍽️Peter's Tea Room🍽️
        </h1>
        <p className="text-lg text-gray-600">Waiter Ordering Interface</p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Menu + Tabs */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-emerald-600 mb-4">Menu</h2>
          <MenuTabs />
        </div>

        {/* Cart Summary */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <OrderCart />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-400">
        Powered by Peter's Tea Room © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default WaiterScreen
