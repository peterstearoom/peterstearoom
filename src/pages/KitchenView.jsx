import React, { useEffect, useState } from 'react'
import { ref, onChildAdded } from 'firebase/database'
import { database } from '../lib/firebase'
import { groupCartItems } from '../utils/groupCartItems'

function KitchenView() {
  const [latestOrder, setLatestOrder] = useState(null)

  useEffect(() => {
    const dateKey = new Date().toISOString().split('T')[0]
    const ordersRef = ref(database, `orders/${dateKey}`)

    const unsubscribe = onChildAdded(ordersRef, (snapshot) => {
      const data = snapshot.val()
      setLatestOrder(data)

      // Print after short delay
      setTimeout(() => {
        window.print()
      }, 500)
    })

    return () => unsubscribe()
  }, [])

  if (!latestOrder) {
    return <div className="p-6 text-center">Waiting for orders...</div>
  }

  const grouped = groupCartItems(latestOrder.items || [])
  const food = grouped.filter((item) => item.category === 'food')
  const drinks = grouped.filter((item) => item.category === 'drinks')

  return (
    <div className="p-6 font-mono text-sm text-black bg-white print:text-sm">
      {/* HEADER */}
      <div className="mb-2 text-sm print:text-sm">
        <strong>{new Date(latestOrder.time).toLocaleString()}</strong><br />
        <strong>Total:</strong> £{latestOrder.total.toFixed(2)}<br />
        <strong>Payment:</strong> {latestOrder.payment}
      </div>

      <hr className="my-2 border-black" />

      {/* FOOD SECTION */}
      {food.length > 0 && (
        <>
          <h2 className="font-bold text-lg mb-1">FOOD</h2>
          {food.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="text-2xl font-bold print:text-3xl print:font-bold">
                {item.qty} {item.name}
              </div>
              {item.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="ml-6 text-base italic font-normal print:text-lg print:italic print:font-normal"
                >
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
          <hr className="my-2 border-black" />
        </>
      )}

      {/* DRINKS SECTION */}
      {drinks.length > 0 && (
        <>
          <h2 className="font-bold text-lg mb-1">DRINKS</h2>
          {drinks.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="text-2xl font-bold print:text-3xl print:font-bold">
                {item.qty} {item.name}
              </div>
              {item.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="ml-6 text-base italic font-normal print:text-lg print:italic print:font-normal"
                >
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      <div className="mt-4 text-right font-bold text-lg">
        Table: {latestOrder.table}
      </div>
    </div>
  )
}

export default KitchenView
