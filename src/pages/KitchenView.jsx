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

      // Delay to ensure layout is rendered before printing
      setTimeout(() => {
        window.print()
      }, 700)
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
    <div className="p-6 font-mono text-black bg-white text-xl print:text-[2rem] print:leading-relaxed print:max-h-screen overflow-hidden print:overflow-visible print:break-after-avoid">
      {/* HEADER */}
      <div className="mb-4 text-lg print:text-2xl">
        <strong>{new Date(latestOrder.time).toLocaleString()}</strong><br />
        <strong>Total:</strong> £{latestOrder.total.toFixed(2)}<br />
        <strong>Payment:</strong> {latestOrder.payment}
      </div>

      <hr className="my-4 border-black" />

      {/* FOOD SECTION */}
      {food.length > 0 && (
        <>
          <h2 className="font-bold text-2xl mb-3 print:text-3xl">FOOD</h2>
          {food.map((item, i) => (
            <div key={i} className="mb-6">
              <div className="text-3xl font-bold print:text-[2.5rem]">{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="ml-6 text-lg italic print:text-2xl"
                >
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
          <hr className="my-4 border-black" />
        </>
      )}

      {/* DRINKS SECTION */}
      {drinks.length > 0 && (
        <>
          <h2 className="font-bold text-2xl mb-3 print:text-3xl">DRINKS</h2>
          {drinks.map((item, i) => (
            <div key={i} className="mb-6">
              <div className="text-3xl font-bold print:text-[2.5rem]">{item.qty} {item.name}</div>
              {item.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="ml-6 text-lg italic print:text-2xl"
                >
                  - {note.qty} {note.note}
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {/* TABLE NUMBER */}
      <div className="mt-8 flex justify-center">
        <div className="border-4 border-black rounded-full px-8 py-4 font-extrabold text-5xl text-center print:text-[3rem]">
          TABLE {latestOrder.table}
        </div>
      </div>
    </div>
  )
}

export default KitchenView
