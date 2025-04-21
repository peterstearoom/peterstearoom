import React from 'react'
import logo from '../assets/PetersTeaRoom-Logo1.png'

function HeaderBar() {
  return (
    <header className="w-full bg-white border-b shadow z-50 p-2 flex items-center justify-center h-20">
      <img
        src={logo}
        alt="Peter's Tea Room Logo"
        className="h-full object-contain pointer-events-none"
      />
    </header>
  )
}

export default HeaderBar
