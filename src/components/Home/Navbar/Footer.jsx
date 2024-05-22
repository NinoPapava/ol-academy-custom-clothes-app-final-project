import React from 'react'
import '../../../assets/styles/Navbar_CSS/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h1 className="logo-text"><span>Clothes</span>Store</h1>
            <p>
              We are dedicated to providing you with the best in fashion.
              Follow us on social media for the latest updates and promotions!
            </p>
            <div className="contact">
              <span><i className="fas fa-phone"></i> &nbsp; (+995) 551-024-120</span>
              <span><i className="fas fa-envelope"></i> &nbsp; ninopapavaa@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2024 Clothes Store | Designed by Nino Papava
        </div>
      </div>
    </footer>
  )
}

export { Footer }