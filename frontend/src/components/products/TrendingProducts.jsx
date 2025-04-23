// TrendingProducts.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from '../../redux/reducers/productSlice'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function TrendingProducts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, status, error } = useSelector((state) => state.products)
  console.log(items)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const popularProducts = items.filter((p) => p.isPopular)

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  }

  if (status === 'loading') return <p>Loading products...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}        // 3 seconds per slide
      keyBoardControl={true}      // let users arrow‑navigate
      showDots={true}
      removeArrowOnDeviceType={['mobile']}  // hide arrows on small screens
      ssr={true}                  // if you’re pre‑rendering
      containerClass="carousel-container"
      dotListClass="custom-dot-list"
      itemClass="carousel-item-padding-40-px">
      {popularProducts.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/products/${product._id}`)}
          className="
            bg-white rounded-2xl shadow-md overflow-hidden
            flex flex-col items-center p-4
            transform transition hover:-translate-y-1 hover:shadow-lg
          "
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-44 object-cover rounded-lg"
          />
          <div className="mt-3 text-center">
            <h3 className="text-base font-semibold text-gray-800 leading-tight">
              {product.title}
            </h3>
            <p className="text-sm font-medium text-red-600">
              ${product.price}
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  )
}

