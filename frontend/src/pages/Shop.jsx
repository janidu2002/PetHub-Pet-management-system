import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryImages = {
    Food: 'https://images.unsplash.com/photo-1596495578065-8b87d4e8e2d4?q=80&w=1200&auto=format&fit=crop',
    Toy: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop',
    Medicine: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    Accessory: 'https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?q=80&w=1200&auto=format&fit=crop'
  };
  const keywordImages = [
    { k: ['dog food','dog kibble','dog'], url: 'https://images.unsplash.com/photo-1596495578065-8b87d4e8e2d4?q=80&w=1200&auto=format&fit=crop' },
    { k: ['cat food','kitten','cat'], url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1200&auto=format&fit=crop' },
    { k: ['ball','toy'], url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop' },
    { k: ['feather','wand'], url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1200&auto=format&fit=crop' },
    { k: ['flea','tick','medicine'], url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop' },
    { k: ['probiotic','digest'], url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop' },
    { k: ['shampoo','wash'], url: 'https://images.unsplash.com/photo-1615485737651-3a5a7cba1cc3?q=80&w=1200&auto=format&fit=crop' },
    { k: ['brush','groom'], url: 'https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?q=80&w=1200&auto=format&fit=crop' }
  ];

  const getProductImage = (p) => {
    if (p.imageUrl) return p.imageUrl;
    const name = (p.name || '').toLowerCase();
    for (const m of keywordImages) {
      if (m.k.some(kw => name.includes(kw))) return m.url;
    }
    return categoryImages[p.category] || '/petbg.jpg';
  };

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/products');
        if (data.success) setProducts(data.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addToCart = (product) => {
    const raw = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(raw);
    const idx = cart.findIndex((i) => i._id === product._id);
    if (idx >= 0) {
      cart[idx].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pet Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow p-4">
            <img src={getProductImage(p)} alt={p.name} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.category}</p>
            <p className="mt-2 font-bold">${p.price?.toFixed(2)}</p>
            <button onClick={() => addToCart(p)} className="mt-3 w-full bg-blue-600 text-white py-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;


