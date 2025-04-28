import React from 'react';
import heroImg from '../../assets/ChatGPT_Image_Apr_20__2025__08_16_55_PM-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="pt-30 px-4 py-3 flex flex-col lg:flex-row items-center justify-between container mx-auto">
      
      {/* Left Content */}
      <div className="text-center lg:text-left lg:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Handcrafted Clay Jewellery
        </h1>

        <p className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0">
          Discover the beauty of handmade clay jewellery – where elegance meets creativity. Each piece is uniquely crafted with love and attention to detail, perfect for expressing your individuality.
        </p>

        <button onClick={()=> navigate("/products")} className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
          Explore Collection
        </button>
      </div>

      {/* Right Image */}
      <div className="mb-10 lg:mb-0 lg:w-1/2 flex justify-center">
        <img src={heroImg} alt="hero" className="w-[200px] md:w-[400px] lg:w-[300px]" />
      </div>
    </section>
  );
}

export default Hero;
