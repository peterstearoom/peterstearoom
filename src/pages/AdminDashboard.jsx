import React, { useEffect, useState } from 'react'
import { ref, get, set, onValue } from 'firebase/database'
import { database } from '../lib/firebase'

const ADMIN_PIN = '1234'

function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false)
  const [pin, setPin] = useState('')
  const [totals, setTotals] = useState({ cash: 0, card: 0 })
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    if (!authorized) return

    const totalsRef = ref(database, `totals/${date}`)

    get(totalsRef).then((snapshot) => {
      if (!snapshot.exists()) {
        set(totalsRef, { cash: 0, card: 0 })
      }
    })

    const unsubscribe = onValue(totalsRef, (snapshot) => {
      const data = snapshot.val() || { cash: 0, card: 0 }
      setTotals(data)
    })

    return () => unsubscribe()
  }, [date, authorized])

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow max-w-sm w-full">
          <h1 className="text-xl font-bold mb-4 text-center">🔒 Admin Login</h1>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border px-3 py-2 w-full rounded mb-3"
          />
          <button
            onClick={() => {
              if (pin === ADMIN_PIN) {
                setAuthorized(true)
              } else {
                alert('❌ Incorrect PIN')
              }
            }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">📊 Daily Totals</h1>

      <label className="block mb-2 font-medium text-sm">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-1 mb-4 rounded"
      />

      <div className="bg-white p-4 rounded-lg shadow max-w-md">
        <p className="text-lg font-semibold">🗓️ {date}</p>
        <p className="mt-2">💰 Cash: <strong>£{totals.cash.toFixed(2)}</strong></p>
        <p className="mt-1">💳 Card: <strong>£{totals.card.toFixed(2)}</strong></p>
        <p className="mt-2 text-gray-500 text-sm">These values update live as orders are placed.</p>
      </div>
    </div>
  )
}

export default AdminDashboard
