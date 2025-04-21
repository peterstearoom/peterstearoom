import React, { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { database } from '../lib/firebase'
import '../styles/custom.css'

function BookingsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [bookings, setBookings] = useState({})
  const [selectedDayData, setSelectedDayData] = useState(null)

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1)

  const getDateKey = (day) =>
    `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  useEffect(() => {
    const monthPrefix = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`
    const bookingsRef = ref(database, 'bookings')
    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val() || {}
      const filtered = Object.entries(data).reduce((acc, [date, entries]) => {
        if (date.startsWith(monthPrefix)) acc[date] = entries
        return acc
      }, {})
      setBookings(filtered)
    })
  }, [currentMonth])

  return (
    <div className="card">
      <div className="calendar-header">
        <button onClick={prevMonth}>←</button>
        <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>→</button>
      </div>

      <div className="calendar-grid">
        {daysInMonth.map((day) => {
          const dateKey = getDateKey(day)
          const hasBooking = bookings[dateKey]

          return (
            <div
              key={day}
              className={`calendar-cell ${hasBooking ? 'has-booking' : ''}`}
              onClick={() => setSelectedDayData({ date: dateKey, bookings: bookings[dateKey] })}
            >
              <strong>{day}</strong>
              {hasBooking && <span>{Object.keys(bookings[dateKey]).length} booking(s)</span>}
            </div>
          )
        })}
      </div>

      {selectedDayData && (
        <div className="calendar-popup">
          <h3>📋 Bookings for {selectedDayData.date}</h3>
          {Object.values(selectedDayData.bookings).map((entry, i) => (
            <div key={i} className="calendar-entry">
              <strong>{entry.name}</strong> | {entry.contact} | Party: {entry.party}<br />
              {entry.paid} | {entry.address}
            </div>
          ))}
          <button onClick={() => setSelectedDayData(null)} className="btn">Close</button>
        </div>
      )}
    </div>
  )
}

export default BookingsCalendar
