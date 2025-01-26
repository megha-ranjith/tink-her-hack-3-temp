import React from 'react';
import type { Product } from '../types';

export default function Marketplace() {
  const products: Product[] = [
    {
      id: '1',
      name: 'Handcrafted Ceramic Vase',
      description: 'Beautiful handmade ceramic vase with unique patterns',
      price: 45,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=500',
      seller: {
        name: 'Sarah\'s Ceramics',
        story: 'Creating beautiful ceramics from my home studio for over 5 years'
      },
      category: 'Home Decor'
    },
    {
      id: '2',
      name: 'Natural Skincare Set',
      description: 'Organic skincare set with face wash, moisturizer, and serum',
      price: 65,
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a138c4?auto=format&fit=crop&q=80&w=500',
      seller: {
        name: 'Pure Beauty Co',
        story: 'Handcrafting natural skincare products using organic ingredients'
      },
      category: 'Beauty'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Women-Led Marketplace</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Seller</p>
                  <p className="text-gray-800 font-medium">{product.seller.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{product.seller.story}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-pink-500">${product.price}</p>
                  <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}