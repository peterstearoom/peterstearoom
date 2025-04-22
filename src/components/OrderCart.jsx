import React, { useState, useEffect } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import { ref, push, get, set } from 'firebase/database'
import { database } from '../lib/firebase'
import { groupCartItems } from '../utils/groupCartItems'
import { useNavigate } from 'react-router-dom'
import '../styles/custom.css'
import FloatingCart from './FloatingCart'


function OrderCart() {
  const {
    cart,
    tableNumber,
    waiterName,
    paymentType,
    setTableNumber,
    setWaiterName,
    setPaymentType,
    updateItem,
    removeItem,
    clearCart
  } = useOrderStore()

  const navigate = useNavigate()
  const [showPayment, setShowPayment] = useState(false)
  const [showRawCart, setShowRawCart] = useState(false)
  const [showSummary, setShowSummary] = useState(true)
  const [showTableMap, setShowTableMap] = useState(false)
  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0)

  // Sync queued orders on reconnect
  useEffect(() => {
    const syncOfflineOrders = async () => {
      const queued = JSON.parse(localStorage.getItem('offlineOrders') || '[]')
      if (!queued.length) return
      for (const order of queued) {
        await uploadOrderToFirebase(order)
      }
      localStorage.removeItem('offlineOrders')
      alert("📡 Back Online - Queued Orders Synced!")
    }

    window.addEventListener('online', syncOfflineOrders)
    return () => window.removeEventListener('online', syncOfflineOrders)
  }, [])

  const submitOrder = () => {
    if (!tableNumber || !waiterName || cart.length === 0) {
      return alert("Please select table number AND waiter before submitting.")
    }
    setShowPayment(true)
  }

  const uploadOrderToFirebase = async (payload) => {
    const dateKey = new Date().toISOString().split('T')[0]
    await push(ref(database, `orders/${dateKey}`), payload)

    const totalsRef = ref(database, `totals/${dateKey}`)
    try {
      const snapshot = await get(totalsRef)
      const current = snapshot.val() || { cash: 0, card: 0 }
      const updated = { ...current }

      if (payload.payment === 'Cash') updated.cash += payload.total
      else updated.card += payload.total

      updated.cash = Number(updated.cash.toFixed(2))
      updated.card = Number(updated.card.toFixed(2))
      await set(totalsRef, updated)
    } catch (error) {
      console.error('Error updating totals:', error)
    }
  }

  const confirmSubmit = async (method) => {
    setPaymentType(method)

    const payload = {
      table: tableNumber,
      waiter: waiterName,
      items: JSON.parse(JSON.stringify(cart)),
      payment: method,
      total: Number(total.toFixed(2)),
      time: new Date().toISOString()
    }

    if (!navigator.onLine) {
      const offlineQueue = JSON.parse(localStorage.getItem('offlineOrders') || '[]')
      localStorage.setItem('offlineOrders', JSON.stringify([...offlineQueue, payload]))

      try {
        const registration = await navigator.serviceWorker.ready
        await registration.sync.register('sync-orders')
      } catch (err) {
        console.warn('Background sync registration failed', err)
      }

      sessionStorage.setItem('offlinePrint', JSON.stringify(payload))
      window.open('/print-temp', '_blank')

      alert("📴 You're offline. Order queued and will print & sync when back online.")
    } else {
      await uploadOrderToFirebase(payload)
      window.open('/kitchen', '_blank')
      if (window.confirm("✅ Order Submitted!\n\nClick OK to go to Kitchen view.")) {
        navigate('/kitchen')
      }
    }

    clearCart()
    setShowPayment(false)
  }

  return (
    <div className="order-wrapper">
      <div className="order-header">
        <h2>🛒 Order Summary</h2>
        {cart.length > 0 && (
          <button onClick={() => setShowRawCart((prev) => !prev)} className="edit-toggle">
            {showRawCart ? '🔙 Back to Summary' : '⚙️ Edit Items'}
          </button>
        )}
      </div>

      <div className="order-inputs">
        <div>
          <label>Table Number</label>
          <input type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
        </div>
        <div>
          <label>Waiter</label>
          <select value={waiterName} onChange={(e) => setWaiterName(e.target.value)}>
            <option value="">Select</option>
            {['Amanda', 'Linda', 'Carrie', 'Sharon', 'Libby', 'Elaine'].map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="hidden-label">Search</label>
<button onClick={() => setShowTableMap(true)} className="search-btn">
  Search Table
</button>

        </div>
      </div>

      <button onClick={() => setShowSummary(!showSummary)} className="view-toggle">
        🛒 View Items <span>{showSummary ? '▲' : '▼'}</span>
      </button>

      {showSummary && (
        <>
  <div id="order-summary"> {/* ✅ Anchor point here */}
          {showRawCart ? (
            <div className="raw-cart">
              <h3>Edit Items</h3>
              <ul>
                {cart.map((item, idx) => (
                  <li key={idx} className="raw-cart-item">
                    <div className="item-header">
                      <div>
                        <strong>{item.name}</strong>
                        <div className="item-note">{item.note}</div>
                      </div>
                      <button onClick={() => removeItem(idx)} className="remove-btn">🗑️</button>
                    </div>
                    <div className="item-controls">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                      />
                      <span>£{(item.qty * item.price).toFixed(2)}</span>
                    </div>
                    <textarea
                      value={item.note}
                      onChange={(e) => updateItem(idx, { note: e.target.value })}
                      placeholder="Notes or allergies..."
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ['food', 'drinks'].map((type) => {
              const itemsOfType = cart.filter((i) => i.category === type)
              const groupedItems = groupCartItems(itemsOfType)
              return groupedItems.length > 0 && (
                <div key={type} className="summary-block">
                  <h3>{type.toUpperCase()}</h3>
                  <ul>
                    {groupedItems.map((item, i) => (
                      <li key={i} className="summary-item">
                        <strong>{item.qty}x {item.name}</strong>
                        {item.notes.map((note, idx) => (
                          <div key={idx} className="summary-note">
                            - {note.qty} {note.note}
                          </div>
                        ))}
                        <span>{' '}£{(item.qty * item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })
          )}
 </div> 
        </>
      )}

      <p className="order-total">Total: £{total.toFixed(2)}</p>

      <button onClick={submitOrder} className="submit-btn">
        ✅ Submit Order
      </button>

      {showPayment && (
        <div className="payment-section">
          <p>Select Payment Method</p>
          <div className="payment-buttons">
            <button onClick={() => confirmSubmit('Card')} className="pay-btn card">💳 Card</button>
            <button onClick={() => confirmSubmit('Cash')} className="pay-btn cash">💵 Cash</button>
          </div>
        </div>
      )}
{showTableMap && (
  <div className="table-overlay">
    <div className="table-map-container">
      <button className="close-map" onClick={() => setShowTableMap(false)}>❌</button>

      {/* L-Shaped Border */}
      <div className="room-outline">
        {Array.from({ length: 21 }, (_, i) => {
          const id = i + 1
          const positions = {
            1: { top: 410, left: 30 }, 2: { top: 270, left: 30 }, 3: { top: 270, left: 160 },
            4: { top: 270, left: 290 }, 5: { top: 270, left: 420 }, 6: { top: 140, left: 560 },
            7: { top: 140, left: 690 }, 8: { top: 270, left: 690 }, 9: { top: 410, left: 690 },
            10: { top: 410, left: 560 }, 11: { top: 410, left: 430 }, 12: { top: 410, left: 300 },
            13: { top: 410, left: 160 }, 14: { top: 140, left: 30 }, 15: { top: 140, left: 160 },
            16: { top: 140, left: 290 }, 17: { top: 140, left: 420 }, 18: { top: 20, left: 30 },
            19: { top: 20, left: 160 }, 20: { top: 20, left: 290 }, 21: { top: 20, left: 420 },
          }

          const { top, left } = positions[id]
          return (
            <div
              key={id}
              className="table-btn"
              style={{ top, left }}
              onClick={() => {
                setTableNumber(id)
                setShowTableMap(false)
              }}
            >
              {id}
            </div>
          )
        })}
      </div>
    </div>
  </div>
)}
  <FloatingCart /> {/* ✅ Reinsert floating cart UI */}

    </div>
  )
}

export default OrderCart
