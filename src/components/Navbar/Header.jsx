import React from 'react'
import '../../assets/styles/Navbar_CSS/Header.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Header = ({ cansel, removeLocal }) => {
  return (
    <header className='header'>
      <div>
        <h1>
          <Link to='/'  >
            Clothes Store
          </Link>
        </h1>
      </div>
      <div className='header-links'>
        <ul>
          <li>
            <Link to='/' onClick={removeLocal} >Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to='/create' onClick={cansel}>Create</Link>
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