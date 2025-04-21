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

      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label><strong>Name</strong></label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <label><strong>Contact Number</strong></label>
          <input name="contact" value={form.contact} onChange={handleChange} required />
        </div>

        <div className="full-width">
          <label><strong>Address</strong></label>
          <input name="address" value={form.address} onChange={handleChange} required />
        </div>

        <div>
          <label><strong>Party Size</strong></label>
          <input name="party" type="number" value={form.party} onChange={handleChange} required />
        </div>

        <div>
          <label><strong>Total Cost (£)</strong></label>
          <input name="cost" type="number" value={form.cost} onChange={handleChange} required />
        </div>

        <div>
          <label><strong>Payment Status</strong></label>
          <select name="paid" value={form.paid} onChange={handleChange} required>
            <option value="None">None</option>
            <option value="Deposit">Deposit</option>
            <option value="In Full">In Full</option>
          </select>
        </div>

        {form.paid === 'Deposit' && (
          <div>
            <label><strong>Deposit Amount (£)</strong></label>
            <input name="deposit" type="number" value={form.deposit} onChange={handleChange} required />
          </div>
        )}

        <div>
          <label><strong>Date</strong></label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>

        <div className="full-width">
          <button className="submit-btn" type="submit">📌 Submit Booking</button>
        </div>
      </form>
    </div>
  )
}

export default BookingsPage
