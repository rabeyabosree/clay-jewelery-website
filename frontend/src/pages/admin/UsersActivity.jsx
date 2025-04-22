import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersActivitys } from '../../redux/reducers/adminSlice'

function UsersActivity() {
  const dispatch = useDispatch()
  const { activityLogs, status, error } = useSelector((state) => state.admin)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    dispatch(getUsersActivitys())
  }, [dispatch])

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = activityLogs?.slice(startIndex, startIndex + itemsPerPage) || []

  const totalPages = Math.ceil((activityLogs?.length || 0) / itemsPerPage)

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  return (
    <div className='container mx-auto px-4 py-4'>
      <h2 className='text-xl font-bold mb-4'>User Activities</h2>

      {status === 'loading' ? (
        <p>Loading activities...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : paginatedItems.length === 0 ? (
        <p className="text-gray-600">No activities found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {paginatedItems.map((activity, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md">
              <p className="font-medium text-gray-800">User: {activity._id || 'Unknown'}</p>
              <p className="text-sm text-gray-600">Activity: {activity.action}</p>
              <p className="text-xs text-gray-500">Time: {new Date(activity.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default UsersActivity
