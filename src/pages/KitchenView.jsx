import React, { useEffect, useState } from 'react'
import { ref, onChildAdded, get } from 'firebase/database'
import { database } from '../lib/firebase'
import { groupCartItems } from '../utils/groupCartItems'

function KitchenView() {
  const [orders, setOrders] = useState([])
  const [latestOrder, setLatestOrder] = useState(null)

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
      if (all.length > 0) setLatestOrder(all[0])
    })

    const unsubscribe = onChildAdded(ordersRef, (snapshot) => {
      const newOrder = snapshot.val()
      if (!newOrder.time) return
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

  if (!latestOrder) return <div className="p-6 text-center">Waiting for orders...</div>

  const grouped = groupCartItems(latestOrder.items || [])
  const food = grouped.filter((item) => item.category === 'food')
  const drinks = grouped.filter((item) => item.category === 'drinks')

  return (
    <div className="relative h-[100vh] bg-white font-mono text-black overflow-hidden">

      {/* Branding */}
      <div className="text-center text-xs text-gray-500 mb-2 print:mb-2" style={{ fontSize: '0.5rem' }}>
        Peter's Tea Room
      </div>

      {/* Dropdown */}
      <div className="p-4 bg-gray-100 mb-2 text-sm print:hidden">
        <label className="block font-semibold mb-1">Reprint previous order:</label>
        <select
          className="w-full border rounded px-3 py-2"
          onChange={(e) => {
            const selectedIndex = e.target.value
            if (selectedIndex !== '') {
              handleReprint(orders[selectedIndex])
            }
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

      {/* Header */}
      <div className="mb-2 px-6 text-gray-700 leading-tight" style={{ fontSize: '0.5rem' }}>
        <strong>{new Date(latestOrder.time).toLocaleString()}</strong><br />
        <strong>Total:</strong> £{latestOrder.total.toFixed(2)}<br />
        <strong>Payment:</strong> {latestOrder.payment}
      </div>

      <hr className="my-2 border-black mx-6" />

      {/* FOOD */}
      {food.length > 0 && (
        <div className="px-6">
          <h2 className="font-bold text-2xl mb-3 print:text-3xl">FOOD</h2>
          {food.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="font-bold" style={{ fontSize: '1.8rem' }}>{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="ml-6 italic"
                  style={{ fontSize: '1.1rem' }}
                >
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
          <hr className="my-2 border-black" />
        </div>
      )}

      {/* DRINKS */}
      {drinks.length > 0 && (
        <div className="px-6">
          <h2 className="font-bold text-2xl mb-3 print:text-3xl">DRINKS</h2>
          {drinks.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="font-bold" style={{ fontSize: '1.8rem' }}>{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="ml-6 italic"
                  style={{ fontSize: '1.1rem' }}
                >
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Table Number */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 border-4 border-black rounded-full px-8 py-4 font-extrabold text-center bg-white" style={{ fontSize: '2.5rem' }}>
        TABLE {latestOrder.table}
      </div>
    </div>
  )
}

export default KitchenView
