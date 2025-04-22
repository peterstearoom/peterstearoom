import React from 'react';
import { useOrderStore } from '../store/useOrderStore';
import '../styles/custom.css';

function FloatingCart() {
  const cart = useOrderStore((state) => state.cart);
  const cartCount = cart.length;

  const scrollToSummary = () => {
    const summarySection = document.getElementById('order-summary');
    if (summarySection) {
      summarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button className="floating-cart-btn" onClick={scrollToSummary}>
      🛒 {cartCount} item{cartCount !== 1 ? 's' : ''}
    </button>
  );
}

export default FloatingCart;
