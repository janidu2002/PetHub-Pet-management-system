import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(raw);
    setItems(cart);
    setTotal(cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0));
  }, []);

  const inc = (id) => {
    const next = items.map(i => i._id === id ? { ...i, qty: i.qty + 1 } : i);
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
    setTotal(next.reduce((s,i)=>s+(i.price||0)*(i.qty||1),0));
  };

  const dec = (id) => {
    const next = items.map(i => i._id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i);
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
    setTotal(next.reduce((s,i)=>s+(i.price||0)*(i.qty||1),0));
  };

  const removeItem = (id) => {
    const next = items.filter(i => i._id !== id);
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
    setTotal(next.reduce((s,i)=>s+(i.price||0)*(i.qty||1),0));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(i => (
              <div key={i._id} className="bg-white rounded shadow p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-gray-500">${(i.price||0).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>dec(i._id)} className="px-2 py-1 border rounded">-</button>
                  <span>{i.qty}</span>
                  <button onClick={()=>inc(i._id)} className="px-2 py-1 border rounded">+</button>
                </div>
                <div className="font-semibold">${(((i.price||0)*(i.qty||1))).toFixed(2)}</div>
                <button onClick={()=>removeItem(i._id)} className="text-red-600">Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            <Link to="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


