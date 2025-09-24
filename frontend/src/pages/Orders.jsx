import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/orders/my');
        if (data.success) setOrders(data.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o._id} className="bg-white rounded shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order #{o._id.slice(-6)}</div>
                  <div className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="font-semibold">${o.total?.toFixed(2)}</div>
              </div>
              <div className="mt-3 text-sm text-gray-700">
                {o.items.map(i => (
                  <div key={i.productId} className="flex items-center justify-between">
                    <span>{i.name} × {i.qty}</span>
                    <span>${(i.price * i.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


