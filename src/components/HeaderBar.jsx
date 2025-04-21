import React from 'react'
import logo from '../assets/PetersTeaRoom-Logo1.png'

function HeaderBar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50 px-4 py-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Peter's Tea Room Logo" className="h-12 object-contain" />
      </div>
    </div>
  )
}

export default HeaderBar
