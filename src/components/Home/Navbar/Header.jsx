import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import '../../../assets/styles/Navbar_CSS/Header.css'

const Header = () => {
  return (
    <header className='header'>
      <div>
        <h1>
          <Link to='/' className='logo' >
            Clothes Store
          </Link>
        </h1>
      </div>
      <div className='header-links'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to='/create'>Create</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to='/history'>History</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export { Header }