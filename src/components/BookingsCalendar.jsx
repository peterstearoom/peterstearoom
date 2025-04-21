
import React, { useState, useEffect } from 'react'
import { ref, onValue, set } from 'firebase/database'
import { database } from '../lib/firebase'
import '../styles/custom.css'

function BookingsCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [bookings, setBookings] = useState({})
  const [selected, setSelected] = useState(null)
  const [editData, setEditData] = useState({ name: '', party: '', paid: '' })

  useEffect(() => {
    const monthStr = String(currentMonth + 1).padStart(2, '0')
    const yearMonth = \`\${currentYear}-\${monthStr}\`
    const bookingsRef = ref(database, \`bookings/\`)
    onValue(bookingsRef, snapshot => {
      const data = snapshot.val() || {}
      setBookings(data)
    })
  }, [currentMonth, currentYear])

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const monthLabel = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })

  const handleSelect = (dateStr) => {
    const entries = bookings[dateStr] || {}
    const keys = Object.keys(entries)
    if (keys.length > 0) {
      const key = keys[0]
      setSelected({ date: dateStr, key })
      setEditData(entries[key])
    } else {
      setSelected({ date: dateStr, key: null })
      setEditData({ name: '', party: '', paid: '' })
    }
  }

  const saveEdit = async () => {
    if (selected) {
      const refPath = ref(database, \`bookings/\${selected.date}/\${selected.key || Date.now()}\`)
      await set(refPath, { ...editData, time: new Date().toISOString() })
      setSelected(null)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(prev => prev - 1)
    } else {
      setCurrentMonth(prev => prev - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(prev => prev + 1)
    } else {
      setCurrentMonth(prev => prev + 1)
    }
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{monthLabel}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="calendar-cell header">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={'blank' + i} className="calendar-cell empty"></div>)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dateStr = \`\${currentYear}-\${String(currentMonth + 1).padStart(2, '0')}-\${String(i + 1).padStart(2, '0')}\`
          const hasBooking = bookings[dateStr]
          return (
            <div
              key={i}
              className={\`calendar-cell \${hasBooking ? 'booked' : ''}\`}
              onClick={() => handleSelect(dateStr)}
            >
              <strong>{i + 1}</strong>
              {hasBooking && <div className="dot"></div>}
            </div>
          )
        })}
      </div>

      {selected && (
        <div className="calendar-edit-box">
          <h3>Edit Booking: {selected.date}</h3>
          <input value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} placeholder="Name" />
          <input value={editData.party} onChange={e => setEditData({ ...editData, party: e.target.value })} placeholder="Party" type="number" />
          <input value={editData.paid} onChange={e => setEditData({ ...editData, paid: e.target.value })} placeholder="Paid status" />
          <button onClick={saveEdit} className="btn">💾 Save</button>
        </div>
      )}
    </div>
  )
}

export default BookingsCalendar
