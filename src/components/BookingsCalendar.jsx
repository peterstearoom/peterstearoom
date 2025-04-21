
import React, { useState, useEffect } from 'react'
import { ref, onValue, set } from 'firebase/database'
import { database } from '../lib/firebase'
import '../styles/custom.css'

function BookingsCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [bookings, setBookings] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    party: '',
    cost: '',
    paid: 'None',
    deposit: ''
  })

  useEffect(() => {
    const bookingsRef = ref(database, 'bookings/')
    onValue(bookingsRef, snapshot => {
      const data = snapshot.val() || {}
      setBookings(data)
    })
  }, [currentMonth, currentYear])

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const monthLabel = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })

  const handleOpenModal = (dateStr) => {
    setSelectedDate(dateStr)
    const existing = bookings[dateStr]
    if (existing) {
      const key = Object.keys(existing)[0]
      setFormData({ ...existing[key] })
    } else {
      setFormData({
        name: '', contact: '', address: '', party: '', cost: '', paid: 'None', deposit: ''
      })
    }
    setModalOpen(true)
  }

  const saveBooking = async () => {
    const payload = {
      ...formData,
      party: Number(formData.party),
      cost: Number(formData.cost),
      deposit: formData.paid === 'Deposit' ? Number(formData.deposit || 0) : 0,
      time: new Date().toISOString()
    }
    const dateKey = selectedDate
    await set(ref(database, 'bookings/' + dateKey + '/' + dateKey.replaceAll('-', '')), payload)
    setModalOpen(false)
  }

  const cellClass = (dateStr) => {
    const data = bookings[dateStr]
    if (!data) return ''
    const key = Object.keys(data)[0]
    const paidStatus = data[key]?.paid || ''
    if (paidStatus === 'In Full') return 'booked green'
    if (paidStatus === 'Deposit') return 'booked orange'
    if (paidStatus === 'None') return 'booked red'
    return 'booked'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        <button onClick={prevMonth}>←</button>
        <h2>{monthLabel}</h2>
        <button onClick={nextMonth}>→</button>
      </div>
      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="calendar-cell header">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={'empty' + i} className="calendar-cell empty"></div>)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
          return (
            <div key={i} className={`calendar-cell ${cellClass(dateStr)}`} onClick={() => handleOpenModal(dateStr)}>
              <strong>{i + 1}</strong>
            </div>
          )
        })}
      </div>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Booking for {selectedDate}</h3>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <input name="party" value={formData.party} onChange={handleChange} placeholder="Party Size" type="number" />
            <input name="cost" value={formData.cost} onChange={handleChange} placeholder="Total Cost (£)" type="number" />

            <select name="paid" value={formData.paid} onChange={handleChange}>
              <option value="None">None</option>
              <option value="Deposit">Deposit</option>
              <option value="In Full">In Full</option>
            </select>

            {formData.paid === 'Deposit' && (
              <input name="deposit" value={formData.deposit} onChange={handleChange} placeholder="Deposit (£)" type="number" />
            )}

            <div className="modal-actions">
              <button className="btn" onClick={saveBooking}>💾 Save</button>
              <button className="btn-outline" onClick={() => setModalOpen(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsCalendar
