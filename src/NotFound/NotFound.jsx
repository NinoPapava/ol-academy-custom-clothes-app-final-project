import React from 'react'
import '../assets/styles/Pages_CSS/NotFound.css'

const NotFound = () => {
  return (
    <div className='notfound'>
      <div className='error-message'>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for was not found</p>
      </div>
    </div>
  )
}

export { NotFound }