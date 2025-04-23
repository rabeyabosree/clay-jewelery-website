import React from 'react'
import Navbar from './../../components/common/Navbar';
import Hero from './../../components/common/Hero';
import TrendingProducts from './../../components/products/TrendingProducts';
import CategoryPage from './../../components/products/CategoryPage';
import NewArrivals from './../../components/common/NewArrivals';
import FeaturedProduct from './../../components/products/FeaturedProduct';
import BlogPost from '../../components/products/BlogPost';
import Footer from '../../components/common/Footer';

function Home() {
  return (
    <div className='bg-gray-50 mx-auto px-4'>
      <Navbar />
      <Hero />
      <CategoryPage />
      <TrendingProducts />
      <NewArrivals />
      <FeaturedProduct />
      <BlogPost />
      <Footer />
    </div>
  )
}

export default Home