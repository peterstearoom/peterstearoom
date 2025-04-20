import React from 'react'
import { database } from '../lib/firebase'
import { ref, push } from 'firebase/database'

function TestFirebase() {
  const testOrder = {
    table: 5,
    items: [
      {
        name: 'Cheeseburger',
        qty: 2,
        notes: 'No pickles'
      },
      {
        name: 'Coke',
        qty: 1,
        notes: ''
      }
    ],
    total: 22.5,
    payment: 'Card',
    time: new Date().toISOString()
  }

  const sendOrder = async () => {
    try {
      const ordersRef = ref(database, 'orders')
      await push(ordersRef, {
        table: testOrder.table,
        items: JSON.parse(JSON.stringify(testOrder.items)), // plain object
        total: testOrder.total,
        payment: testOrder.payment,
        time: testOrder.time
      })
      alert('✅ Order sent to Firebase!')
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Test Firebase Order</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={sendOrder}
      >
        Send Test Order
      </button>
    </div>
  )
}

export default TestFirebase
