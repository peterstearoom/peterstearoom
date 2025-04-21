import React from 'react'
import logo from '../assets/PetersTeaRoom-Logo1.png'
import { useOrderStore } from '../store/useOrderStore'

const waiterNames = ['Amanda', 'Linda', 'Carrie', 'Sharon', 'Libby', 'Elaine']

function HeaderBar() {
  const { tableNumber, setTableNumber, waiterName, setWaiterName } = useOrderStore()

  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50 px-4 py-2 flex justify-between items-center">
      <img src={logo} alt="Peter's Tea Room Logo" className="h-14 object-contain" />

      <div className="flex items-center gap-3">
        <select
          className="border px-3 py-2 rounded text-sm shadow-sm focus:outline-none"
          value={waiterName}
          onChange={(e) => setWaiterName(e.target.value)}
        >
          <option value="">Select Waiter</option>
          {waiterNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow text-sm"
          onClick={() => alert('🧩 Table Selector UI coming soon!')}
        >
          Search Table
        </button>
      </div>
    </div>
  )
}

export default HeaderBar
