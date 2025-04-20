import React, { useState } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import { ref, push } from 'firebase/database'
import { database } from '../lib/firebase'

function OrderCart() {
  const {
    cart,
    tableNumber,
    paymentType,
    setTableNumber,
    setPaymentType,
    updateItem,
    removeItem,
    clearCart
  } = useOrderStore()

  const [showPayment, setShowPayment] = useState(false)
  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0)

  const grouped = { food: [], drinks: [] }
  cart.forEach((item) => grouped[item.category].push(item))

  const submitOrder = () => {
    if (!tableNumber || cart.length === 0) return alert("Missing table # or cart")

    setShowPayment(true)
  }

  const confirmSubmit = async (method) => {
    setPaymentType(method)

    const payload = {
      table: tableNumber,
      items: JSON.parse(JSON.stringify(cart)),
      payment: method,
      total: Number(total.toFixed(2)),
      time: new Date().toISOString()
    }

    await push(ref(database, 'orders'), payload)
    alert("✅ Order Submitted!")
    clearCart()
    setShowPayment(false)
  }

  return (
    <div className="p-4 bg-white mt-4 shadow rounded">
      <h2 className="text-xl font-bold mb-2">🛒 Order Summary</h2>

      <input
        placeholder="Table Number"
        type="number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        className="border px-2 py-1 mb-3 w-full"
      />

      {['food', 'drinks'].map((type) =>
        grouped[type].length > 0 && (
          <div key={type}>
            <h3 className="font-semibold">{type.toUpperCase()}</h3>
            <ul>
              {grouped[type].map((item, i) => {
                const idx = cart.findIndex((ci) =>
                  ci.name === item.name && ci.category === item.category && ci.note === item.note
                )
                return (
                  <li key={i} className="border-b py-2">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <button onClick={() => removeItem(idx)} className="text-red-600 text-xs">
                        Remove
                      </button>
                    </div>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                      className="border px-2 py-1 w-16 text-sm mt-1"
                    />
                    <textarea
                      value={item.note}
                      onChange={(e) => updateItem(idx, { note: e.target.value })}
                      className="w-full border text-sm mt-1 px-2 py-1"
                    />
                    <div className="text-xs text-right">£{(item.qty * item.price).toFixed(2)}</div>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      )}

      <p className="mt-2 font-bold text-right">Total: £{total.toFixed(2)}</p>

      <button onClick={submitOrder} className="mt-3 w-full bg-blue-600 text-white py-2 rounded">
        Submit Order
      </button>

      {showPayment && (
        <div className="mt-3">
          <p>Select Payment Method</p>
          <div className="flex gap-2 mt-1">
            <button onClick={() => confirmSubmit('Card')} className="flex-1 bg-gray-800 text-white py-1 rounded">Card</button>
            <button onClick={() => confirmSubmit('Cash')} className="flex-1 bg-green-600 text-white py-1 rounded">Cash</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCart
