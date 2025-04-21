import React from 'react'
import MenuTabs from '../components/MenuTabs'
import OrderCart from '../components/OrderCart'
import HeaderBar from '../components/HeaderBar'

function WaiterScreen() {
  return (
    <>
      <HeaderBar />

      <main className="pt-28 px-4 md:px-8 lg:px-16 min-h-screen bg-gradient-to-br from-[#f7f6f3] to-[#e2dfd7] text-gray-800">
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
          Created by Jordan Kershaw © {new Date().getFullYear()}
        </footer>
      </main>
    </>
  )
}

export default WaiterScreen
