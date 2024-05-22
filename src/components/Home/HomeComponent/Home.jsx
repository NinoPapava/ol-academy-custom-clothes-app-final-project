import React from 'react'
import { Header } from '../Navbar/Header'
import { Footer } from '../Navbar/Footer'
import { Link } from'react-router-dom/cjs/react-router-dom.min'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/styles/Pages_CSS/Home.css'
import gif from '../../../assets/images/comp.gif'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-page">
        <h2 >Welcome to Our Custom Clothing Creator</h2>
        <img src={gif} alt="gif" />
        <p>Create your own unique clothing designs with our easy-to-use customization tool. Choose the type of clothing, select your preferred size and color, and add any additional features to make your design one-of-a-kind.</p>
        <Link to="/create" ><button>Create Clothes Design</button></Link>
        <p>Already have a design in mind? View your past orders and reorder your favorite creations.</p>
        <Link to="/history" ><button>See Orders</button></Link>
      </div>
      <Footer />
    </div>
  )
}

export { Home }