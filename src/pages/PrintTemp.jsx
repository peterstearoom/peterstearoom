import React, { useEffect, useState } from 'react'
import { groupCartItems } from '../utils/groupCartItems'
import '../styles/custom.css'

function PrintTemp() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('offlinePrint')
    if (saved) {
      const parsed = JSON.parse(saved)
      setOrder(parsed)
      setTimeout(() => window.print(), 600)
    } else {
      alert("No offline order to print.")
    }
  }, [])

  if (!order) return <div className="p-6">Loading...</div>

  const grouped = groupCartItems(order.items)
  const food = grouped.filter(item => item.category === 'food')
  const drinks = grouped.filter(item => item.category === 'drinks')

  return (
    <div className="kitchen-view-container">

      <div className="kitchen-brand">Peter's Tea Room</div>

      <div className="kitchen-order-info">
        <strong>{new Date(order.time).toLocaleString()}</strong><br />
        <strong>Total:</strong> £{order.total.toFixed(2)}<br />
        <strong>Payment:</strong> {order.payment}<br />
        <strong>Served by:</strong> {order.waiter || 'N/A'}
      </div>

      <hr className="kitchen-divider" />

      {food.length > 0 && (
        <div className="kitchen-section">
          <h2>FOOD</h2>
          {food.map((item, i) => (
            <div key={i} className="kitchen-item">
              <div className="kitchen-item-title">{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div key={idx} className="kitchen-note">- {note.qty} {note.note}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      {food.length > 0 && drinks.length > 0 && (
        <hr className="kitchen-divider-thin" />
      )}

      {drinks.length > 0 && (
        <div className="kitchen-section">
          <h2>DRINKS</h2>
          {drinks.map((item, i) => (
            <div key={i} className="kitchen-item">
              <div className="kitchen-item-title">{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div key={idx} className="kitchen-note">- {note.qty} {note.note}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="kitchen-table-banner">
        TABLE {order.table}
      </div>
    </div>
  )
}

export default PrintTemp
