import React, { useEffect, useState } from 'react'
import { ref, get, set, onValue } from 'firebase/database'
import { database } from '../lib/firebase'
import '../styles/custom.css'

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
      <div className="admin-container">
        <div className="admin-login-box">
          <h1 className="admin-login-title">🔒 Admin Login</h1>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="admin-input"
          />
          <button
            onClick={() => {
              if (pin === ADMIN_PIN) {
                setAuthorized(true)
              } else {
                alert('❌ Incorrect PIN')
              }
            }}
            className="admin-btn"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <h1 className="admin-heading">📊 Daily Sales Summary</h1>

      <label className="admin-label">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="admin-input"
      />

      <div className="admin-summary-box">
        <p className="admin-summary-date">🗓️ {date}</p>
        <p className="admin-summary-line">💰 Cash: <strong>£{totals.cash.toFixed(2)}</strong></p>
        <p className="admin-summary-line">💳 Card: <strong>£{totals.card.toFixed(2)}</strong></p>
        <p className="admin-note">These values update live as orders are placed.</p>
      </div>
    </div>
  )
}

export default AdminDashboard
