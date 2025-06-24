'use client';

import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  priceLinux: number;
  priceWindows: number;
  imageUrl: string;
  techStack: string;
  windowsBuyLink?: string;
  linuxBuyLink?: string;
}

interface ProductListProps {
  onEditProduct: (product: Product) => void;
}

export default function ProductList({ onEditProduct }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 transition-colors duration-500 hover:scale-105">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-500">Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="py-2 border-b border-gray-200 dark:border-gray-700 transition-colors duration-500 flex items-center justify-between">
            <div>{product.name} - {product.description} - Linux: {product.priceLinux} - Windows: {product.priceWindows} - Tech: {product.techStack}</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2 transition-colors duration-500 hover:scale-105"
              onClick={() => onEditProduct(product)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
