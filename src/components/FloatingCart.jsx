import React from 'react'
import { useOrderStore } from '../store/useOrderStore'

const FloatingCart = () => {
  const orderItems = useOrderStore(state => state.orderItems)
  const cartCount = orderItems.length

  const handleClick = () => {
    const orderSection = document.getElementById('order-summary')
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '0.7rem 1.2rem',
        fontSize: '1.1rem',
        borderRadius: '50px',
        backgroundColor: '#333',
        color: '#fff',
        zIndex: 1000,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      }}
    >
      🛒 {cartCount} {cartCount === 1 ? 'item' : 'items'}
    </button>
  )
}

export default FloatingCart
