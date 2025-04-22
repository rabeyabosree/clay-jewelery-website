import React from 'react'
import Navbar from './../../components/common/Navbar';
import Hero from './../../components/common/Hero';
import TrendingProducts from './../../components/products/TrendingProducts';

function Home() {
  return (
    <div className='bg-gray-50'>
      <Navbar />
      <Hero />
      <TrendingProducts />
    </div>
  )
}

export default Home