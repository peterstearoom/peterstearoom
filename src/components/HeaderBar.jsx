import React from 'react'
import logo from '../assets/PetersTeaRoom-Logo1.png'

function HeaderBar() {
  return (
    <header className="header-bar">
      <img
        src={logo}
        alt="Peter's Tea Room"
        className="header-logo"
      />
    </header>
  )
}

export default HeaderBar
