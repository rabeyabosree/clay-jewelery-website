import React, { useEffect } from 'react';
import { getAllOrders } from '../../redux/reducers/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

function GetOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {orders?.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border p-4 rounded shadow-sm">
                  <p>
                    <strong>User:</strong> {order.userId?.name} ({order.userId?.email})
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </p>
                  <div className="mt-2">
                    <strong>Products:</strong>
                    <ul className="list-disc list-inside">
                      {order.products.map((item, idx) => (
                        <li key={idx}>
                          {item.productId?.title} - Qty: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500">
                    Ordered on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GetOrders;
