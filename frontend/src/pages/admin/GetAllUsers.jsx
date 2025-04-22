import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/reducers/adminSlice'

function GetAllUsers() {
  const dispatch = useDispatch()
  const { users, status, error } = useSelector((state) => state.admin)

  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 8

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil((users?.length || 0) / usersPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Users (Admin)</h2>

      {status === 'loading' && <p className="text-blue-500">Loading users...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b capitalize">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                  <td className="py-2 px-4 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">No users found.</td>
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

export default GetAllUsers
