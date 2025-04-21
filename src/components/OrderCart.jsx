import React, { useState } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import { ref, push, get, set } from 'firebase/database'
import { database } from '../lib/firebase'
import { groupCartItems } from '../utils/groupCartItems'
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()
  const [showPayment, setShowPayment] = useState(false)
  const [showRawCart, setShowRawCart] = useState(false)
  const [showSummary, setShowSummary] = useState(true)
  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0)

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

    const dateKey = new Date().toISOString().split('T')[0]
    await push(ref(database, `orders/${dateKey}`), payload)

    const totalsRef = ref(database, `totals/${dateKey}`)

    try {
      const snapshot = await get(totalsRef)
      const current = snapshot.val() || { cash: 0, card: 0 }
      const updated = { ...current }

      if (method === 'Cash') updated.cash += payload.total
      else updated.card += payload.total

      updated.cash = Number(updated.cash.toFixed(2))
      updated.card = Number(updated.card.toFixed(2))

      await set(totalsRef, updated)
    } catch (error) {
      console.error('Error updating totals:', error)
    }

    clearCart()
    setShowPayment(false)

    if (window.confirm("✅ Order Submitted!\n\nClick OK to go to Kitchen view.")) {
      navigate('/kitchen')
    }
  }

  return (
    <div className="p-6 bg-white mt-6 shadow-md rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-emerald-700">🛒 Order Summary</h2>
        {cart.length > 0 && (
          <button
            onClick={() => setShowRawCart((prev) => !prev)}
            className="text-sm text-gray-600 underline"
          >
            {showRawCart ? '🔙 Back to Summary' : '⚙️ Edit Items'}
          </button>
        )}
      </div>

      <label className="block text-sm font-medium mb-1 text-gray-700">Table Number</label>
      <input
        type="number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        className="w-full border rounded-md px-3 py-2 mb-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <button
        onClick={() => setShowSummary(!showSummary)}
        className="w-full text-left font-semibold text-lg mb-3 text-emerald-700 flex justify-between items-center"
      >
        🛒 View Items
        <span>{showSummary ? '▲' : '▼'}</span>
      </button>

      {showSummary && (
        <>
          {showRawCart ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-lg text-emerald-600 mb-2">Edit Items</h3>
              <ul>
                {cart.map((item, idx) => (
                  <li key={idx} className="mb-4 border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-md">{item.name}</div>
                        <div className="text-xs italic text-gray-500">{item.note}</div>
                      </div>
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                        className="w-20 border px-2 py-1 text-sm rounded-md shadow-sm"
                      />
                      <div className="ml-auto text-sm font-semibold text-gray-700">
                        £{(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>

                    <textarea
                      value={item.note}
                      onChange={(e) => updateItem(idx, { note: e.target.value })}
                      className="w-full border rounded-md text-sm mt-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="Add notes or allergies..."
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {['food', 'drinks'].map((type) => {
                const itemsOfType = cart.filter((i) => i.category === type)
                const groupedItems = groupCartItems(itemsOfType)

                return groupedItems.length > 0 && (
                  <div key={type} className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-lg text-emerald-600 mb-2">{type.toUpperCase()}</h3>
                    <ul>
                      {groupedItems.map((item, i) => (
                        <li key={i} className="mb-4">
                          <div className="font-bold text-md">{item.qty}x {item.name}</div>
                          {item.notes.map((note, idx) => (
                            <div
                              key={idx}
                              className="ml-4 text-sm italic text-gray-600"
                            >
                              - {note.qty} {note.note}
                            </div>
                          ))}
                          <div className="text-sm text-right font-medium text-gray-700">
                            £{(item.qty * item.price).toFixed(2)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </>
          )}
        </>
      )}

      <p className="mt-6 text-right text-4xl font-extrabold text-emerald-700 tracking-wide">
        Total: £{total.toFixed(2)}
      </p>

      <button
        onClick={submitOrder}
        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md transition"
      >
        Submit Order
      </button>

      {showPayment && (
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium text-gray-700">Select Payment Method</p>
          <div className="flex gap-3">
            <button
              onClick={() => confirmSubmit('Card')}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md"
            >
              💳 Card
            </button>
            <button
              onClick={() => confirmSubmit('Cash')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              💵 Cash
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCart
