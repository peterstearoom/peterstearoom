import React, { useState } from 'react'
import { ref, push } from 'firebase/database'
import { database } from '../lib/firebase'
import '../styles/custom.css'

function BookingsPage() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    party: '',
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
      deposit: form.paid === 'Deposit' ? Number(form.deposit || 0) : 0,
      time: new Date().toISOString()
    }

    const dateKey = form.date
    await push(ref(database, `bookings/${dateKey}`), payload)
    alert('✅ Booking saved!')
    setForm({
      name: '', contact: '', address: '', party: '', paid: 'None', deposit: '', date: ''
    })
  }

  return (
    <div className="card">
      <h2 className="section-title">📅 Book a Catering Date</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Number" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
        <input name="party" value={form.party} onChange={handleChange} placeholder="Party Amount" type="number" required />

        <select name="paid" value={form.paid} onChange={handleChange} required>
          <option value="None">None</option>
          <option value="Deposit">Deposit</option>
          <option value="In Full">In Full</option>
        </select>

        {form.paid === 'Deposit' && (
          <input name="deposit" value={form.deposit} onChange={handleChange} type="number" placeholder="£ Deposit amount" required />
        )}

        <input name="date" type="date" value={form.date} onChange={handleChange} required />

        <button className="submit-btn" type="submit">📌 Submit Booking</button>
      </form>
    </div>
  )
}

export default BookingsPage
