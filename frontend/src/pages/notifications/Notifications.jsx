import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import { fetchNotifications, markNotificationAsRead } from '../../redux/reducers/notificationSlice';

function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { items , error, loading } = useSelector((state) => state.notifications);

  const socket = io("http://localhost:9080")

  // Only fetch notifications if user is available
  useEffect(() => {
    socket.connect()
    if (user?._id) {
      dispatch(fetchNotifications(user?._id));
    }
    socket.emit("online-user", user?._id)
    socket.on("new-notification", (newNotif) => {
      dispatch(fetchNotifications(user?._id))
    })
    return ()=>{
      socket.off("new-notification")
    }
  }, [user, dispatch]);

  // Handle notification click
  const handleNotificationClick = (notif) => {
    if (!notif.read) {
      dispatch(markNotificationAsRead(notif._id)); // Mark as read
    }
    navigate(`/products/${notif.productId}`); // Navigate to product detail page
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p> // Display error if any
      ) : items.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((notif) => (
            <li
              key={notif._id}
              onClick={() => handleNotificationClick(notif)}
              className={`bg-white shadow-sm border hover:shadow-md transition cursor-pointer p-4 rounded ${!notif.read ? "bg-blue-100" : "bg-gray-100"
                }`} // Style for unread and read notifications
            >
              <p className="text-gray-800">{notif.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(notif.createdAt).toLocaleString()}
              </span>
              {!notif.read && <span className="ml-2 text-xs text-blue-600 font-semibold">New</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notifications