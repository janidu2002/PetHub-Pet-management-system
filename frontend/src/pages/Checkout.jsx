import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [method, setMethod] = useState('cod');
  const [savedMethods, setSavedMethods] = useState([]);
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(raw);
    setItems(cart);
    setTotal(cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0));
    const loadCards = async () => {
      try {
        const { data } = await api.get('/payment/methods');
        if (data.success) setSavedMethods(data.methods);
      } catch {}
    };
    loadCards();
  }, []);

  const handlePay = async () => {
    if (items.length === 0) return;
    setProcessing(true);
    try {
      await api.post('/orders', {
        items: items.map(({ _id, qty }) => ({ productId: _id, qty })),
        total,
        shipping,
        paymentMethod: method,
        paymentCard: method === 'saved' && savedMethods[selectedCardIdx]
      });
    } catch {}
    localStorage.removeItem('cart');
    navigate('/orders');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-2 rounded" placeholder="Full Name" value={shipping.fullName} onChange={e=>setShipping({...shipping, fullName:e.target.value})} required />
              <input className="border p-2 rounded" placeholder="Phone" value={shipping.phone} onChange={e=>setShipping({...shipping, phone:e.target.value})} required />
              <input className="border p-2 rounded md:col-span-2" placeholder="Address" value={shipping.address} onChange={e=>setShipping({...shipping, address:e.target.value})} required />
              <input className="border p-2 rounded" placeholder="City" value={shipping.city} onChange={e=>setShipping({...shipping, city:e.target.value})} required />
              <input className="border p-2 rounded" placeholder="Postal Code" value={shipping.postalCode} onChange={e=>setShipping({...shipping, postalCode:e.target.value})} required />
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="method" checked={method==='cod'} onChange={()=>setMethod('cod')} />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="method" checked={method==='saved'} onChange={()=>setMethod('saved')} />
                <span>Saved Card</span>
              </label>
              {method==='saved' && (
                <div className="pl-6">
                  {savedMethods.length === 0 ? (
                    <p className="text-sm text-gray-500">No saved cards. Add one in Payment page.</p>
                  ) : (
                    <select className="border p-2 rounded" value={selectedCardIdx} onChange={(e)=>setSelectedCardIdx(Number(e.target.value))}>
                      {savedMethods.map((m, idx)=>(
                        <option key={idx} value={idx}>{m.label || m.brand} •••• {m.last4} (exp {m.expMonth}/{m.expYear})</option>
                      ))}
                    </select>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <div className="divide-y">
              {items.map(i => (
                <div key={i._id} className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium">{i.name}</div>
                    <div className="text-sm text-gray-500">Qty {i.qty}</div>
                  </div>
                  <div>${(((i.price||0)*(i.qty||1))).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button disabled={processing} onClick={handlePay} className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded">
              {processing ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


