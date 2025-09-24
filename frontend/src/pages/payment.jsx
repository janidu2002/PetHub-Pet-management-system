import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Payment = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ brand: '', last4: '', expMonth: '', expYear: '', label: '' });

  const load = async () => {
    try {
      const { data } = await api.get('/payment/methods');
      if (data.success) setMethods(data.methods);
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      // Only masked metadata; never send raw card number/CVV in production
      await api.post('/payment/methods', {
        brand: form.brand,
        last4: form.last4,
        expMonth: Number(form.expMonth),
        expYear: Number(form.expYear),
        label: form.label
      });
      setForm({ brand: '', last4: '', expMonth: '', expYear: '', label: '' });
      await load();
      alert('Card saved');
    } catch (e) {
      alert('Failed to save card');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Saved Cards</h1>
      <div className="bg-white rounded shadow p-4 mb-8">
        {methods.length === 0 ? (
          <p>No saved cards.</p>
        ) : (
          <ul className="space-y-2">
            {methods.map((m, idx) => (
              <li key={m._id || idx} className="flex items-center justify-between gap-2">
                <span className="flex-1">{m.label || m.brand} •••• {m.last4} (exp {m.expMonth}/{m.expYear})</span>
                <input
                  className="border p-1 rounded w-40"
                  placeholder="Edit label"
                  defaultValue={m.label}
                  onBlur={async (e)=>{
                    try{ await api.put(`/payment/methods/${m._id}`, { label: e.target.value }); await load(); }catch{}
                  }}
                />
                <button className="text-red-600" onClick={async()=>{ try{ await api.delete(`/payment/methods/${m._id}`); await load(); }catch{} }}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-2">Add Card (demo)</h2>
      <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded shadow p-4">
        <input placeholder="Brand (Visa/Mastercard)" value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} className="border p-2 rounded" required />
        <input placeholder="Last 4 digits" value={form.last4} onChange={e=>setForm({...form, last4:e.target.value})} className="border p-2 rounded" required maxLength={4} />
        <input placeholder="Exp Month (MM)" value={form.expMonth} onChange={e=>setForm({...form, expMonth:e.target.value})} className="border p-2 rounded" required />
        <input placeholder="Exp Year (YYYY)" value={form.expYear} onChange={e=>setForm({...form, expYear:e.target.value})} className="border p-2 rounded" required />
        <input placeholder="Label (e.g., Personal)" value={form.label} onChange={e=>setForm({...form, label:e.target.value})} className="border p-2 rounded md:col-span-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-2">Save Card</button>
      </form>
    </div>
  );
};

export default Payment;


