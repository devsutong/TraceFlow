import React from 'react'
import './NavBar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'


const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <img src={logo} alt='logo' />
        <p>TraceFlow Store</p>
      </div>
      <ul className='navbar-menu'>
        <li>Shop</li>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
        <li>Cosmetics</li>
        <li>Groceries</li>
        <li>Others</li>
      </ul>
    </div>
  )
}

export default NavBar