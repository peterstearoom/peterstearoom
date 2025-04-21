import React, { useState } from 'react'
import { ref, push } from 'firebase/database'
import { database } from '../lib/firebase'
import '../styles/custom.css'
import BookingsCalendar from '../components/BookingsCalendar' // ✅ Import here

function BookingsPage() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    party: '',
    cost: '',
    paid: 'None',
    deposit: '',
    date: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.date) return alert('Please select a date.')

    const payload = {
      ...form,
      party: Number(form.party),
      cost: Number(form.cost || 0),
      deposit: form.paid === 'Deposit' ? Number(form.deposit || 0) : 0,
      time: new Date().toISOString()
    }

    const dateKey = form.date
    await push(ref(database, `bookings/${dateKey}`), payload)
    alert('✅ Booking saved!')
    setForm({
      name: '',
      contact: '',
      address: '',
      party: '',
      cost: '',
      paid: 'None',
      deposit: '',
      date: ''
    })
  }

  return (
    <div className="card">
      <h2 className="section-title">📅 Book a Catering Date</h2>
      <form onSubmit={handleSubmit}>
        {/* Your input fields here */}
      </form>

      {/* 📅 Calendar Grid Below the Form */}
      <BookingsCalendar />
    </div>
  )
}

export default BookingsPage
