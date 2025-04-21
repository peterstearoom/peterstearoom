import React from 'react'
import MenuTabs from '../components/MenuTabs'
import OrderCart from '../components/OrderCart'
import HeaderBar from '../components/HeaderBar'
import '../styles/custom.css'

function WaiterScreen() {
  return (
    <>
      <HeaderBar />

      <main className="waiter-main">
        <div className="waiter-grid">
          <div className="waiter-menu">
            <h2 className="waiter-section-title">📋 Menu</h2>
            <MenuTabs />
          </div>

          <div className="waiter-cart">
            <OrderCart />
          </div>
        </div>

        <footer className="waiter-footer">
          Created by Jordan Kershaw © {new Date().getFullYear()}
        </footer>
      </main>
    </>
  )
}

export default WaiterScreen
