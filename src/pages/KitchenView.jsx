import React, { useEffect, useState } from 'react'
import { ref, onChildAdded, get } from 'firebase/database'
import { database } from '../lib/firebase'
import { groupCartItems } from '../utils/groupCartItems'
import '../styles/custom.css'

function KitchenView() {
  const [orders, setOrders] = useState([])
  const [latestOrder, setLatestOrder] = useState(null)
  const [printedOrderId, setPrintedOrderId] = useState(null)

  const dateKey = new Date().toISOString().split('T')[0]
  const ordersRef = ref(database, `orders/${dateKey}`)

  useEffect(() => {
    get(ordersRef).then((snapshot) => {
      const data = snapshot.val() || {}
      const all = Object.values(data)
        .filter(o => o.time)
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 10)
      setOrders(all)
      if (all.length > 0) {
        setLatestOrder(all[0])
        setPrintedOrderId(Object.keys(data)[0])
      }
    })

    const unsubscribe = onChildAdded(ordersRef, (snapshot) => {
      const newOrder = snapshot.val()
      if (!newOrder.time || snapshot.key === printedOrderId) return
      setPrintedOrderId(snapshot.key)
      setOrders(prev => [newOrder, ...prev].slice(0, 10))
      setLatestOrder(newOrder)
      setTimeout(() => window.print(), 700)
    })

    return () => unsubscribe()
  }, [])

  const handleReprint = (order) => {
    setLatestOrder(order)
    setTimeout(() => window.print(), 700)
  }

  if (!latestOrder) {
    return <div className="kitchen-waiting">Waiting for orders...</div>
  }

  const grouped = groupCartItems(latestOrder.items || [])
  const food = grouped.filter(item => item.category === 'food')
  const drinks = grouped.filter(item => item.category === 'drinks')

  return (
    <div className="kitchen-view-container">

      {/* Brand */}
      <div className="kitchen-brand">Peter's Tea Room</div>

      {/* Dropdown */}
      <div className="kitchen-dropdown-container no-print">
        <label>Reprint previous order:</label>
        <select
          onChange={(e) => {
            const index = e.target.value
            if (index !== '') handleReprint(orders[index])
          }}
          defaultValue=""
        >
          <option value="" disabled>Select from today’s orders</option>
          {orders.map((order, i) => (
            <option key={i} value={i}>
              Table {order.table} – {new Date(order.time).toLocaleTimeString()}
            </option>
          ))}
        </select>
      </div>

      {/* Order Info */}
      <div className="kitchen-order-info">
        <strong>{new Date(latestOrder.time).toLocaleString()}</strong><br />
        <strong>Total:</strong> £{latestOrder.total.toFixed(2)}<br />
        <strong>Payment:</strong> {latestOrder.payment}<br />
        <strong>Served by:</strong> {latestOrder.waiter || 'N/A'}
      </div>

      <hr className="kitchen-divider" />

      {/* Food Section */}
      {food.length > 0 && (
        <div className="kitchen-section">
          <h2>FOOD</h2>
          {food.map((item, i) => (
            <div key={i} className="kitchen-item">
              <div className="kitchen-item-title">{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div key={idx} className="kitchen-note">
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      {food.length > 0 && drinks.length > 0 && (
        <hr className="kitchen-divider-thin" />
      )}

      {/* Drinks Section */}
      {drinks.length > 0 && (
        <div className="kitchen-section">
          <h2>DRINKS</h2>
          {drinks.map((item, i) => (
            <div key={i} className="kitchen-item">
              <div className="kitchen-item-title">{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div key={idx} className="kitchen-note">
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Display for Screen */}
      <div className="kitchen-table-banner no-print">
        TABLE {latestOrder.table}
      </div>

      {/* Display for Print */}
      <div className="print-banner">
        TABLE {latestOrder.table}
      </div>
    </div>
  )
}

export default KitchenView
