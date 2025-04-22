import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/reducers/adminSlice'
import { Link } from 'react-router-dom'

function AllProducts() {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.admin)

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 7

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct)

  const totalPages = Math.ceil((products?.length || 0) / productsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Products (Admin)</h2>

      {status === 'loading' && <p className="text-blue-500">Loading products...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts?.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 border-b capitalize">{product.title}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b capitalize">{product.category}</td>
                  <td className="py-2 px-4 border-b">{product.stock || 'N/A'}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link to={`/admin/edit-product/${product._id}`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-4 text-center text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-1 rounded border ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>

        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-1 rounded border ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AllProducts


