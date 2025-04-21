import React, { useState } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import { groupCartItems } from '../utils/groupCartItems'
import { useNavigate } from 'react-router-dom'

function FloatingCart() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { cart } = useOrderStore()
  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0)
  const grouped = groupCartItems(cart)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white text-2xl px-5 py-3 rounded-full shadow-lg transition-all"
      >
        🛒
      </button>

      {/* Slide Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-0 right-0 left-0 bg-white rounded-t-3xl shadow-xl p-6 max-h-[75vh] overflow-y-auto transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">🧾 Cart</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 text-sm">✖ Close</button>
            </div>

            {grouped.length === 0 ? (
              <p className="text-gray-500 text-sm">Cart is empty</p>
            ) : (
              <>
                <ul className="space-y-3 mb-4">
                  {grouped.map((item, i) => (
                    <li key={i}>
                      <div className="font-semibold text-md">{item.qty}x {item.name}</div>
                      {item.notes.map((note, idx) => (
                        <div key={idx} className="ml-4 text-xs italic text-gray-600">
                          - {note.qty} {note.note}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
                <div className="text-right font-bold text-lg">Total: £{total.toFixed(2)}</div>
                <button
                  onClick={() => {
                    setOpen(false)
                    navigate('/') // already on WaiterScreen – this scrolls to main cart
                  }}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md text-sm font-semibold"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingCart
