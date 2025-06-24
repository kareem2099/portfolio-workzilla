'use client';

import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  priceLinux: number;
  priceWindows: number;
  imageUrl: string;
  techStack: string[];
  windowsBuyLink?: string;
  linuxBuyLink?: string;
}

export default function EditProductForm({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product>({
    _id: '',
    name: '',
    description: '',
    priceLinux: 0,
    priceWindows: 0,
    imageUrl: '',
    techStack: [],
    windowsBuyLink: '',
    linuxBuyLink: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Product updated successfully');
      } else {
        alert('Failed to update product');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value } as Product);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 transition-colors duration-500 hover:scale-105">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-500">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Name</label>
          <input type="text" id="name" name="name" value={product.name || ''} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Description</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="priceLinux" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Price (Linux)</label>
          <input type="number" id="priceLinux" name="priceLinux" value={product.priceLinux} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="priceWindows" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Price (Windows)</label>
          <input type="number" id="priceWindows" name="priceWindows" value={product.priceWindows} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" value={product.imageUrl} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="techStack" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Technologies Used</label>
          <input type="text" id="techStack" name="techStack" value={product.techStack} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="windowsBuyLink" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Windows Buy Link</label>
          <input type="text" id="windowsBuyLink" name="windowsBuyLink" value={product.windowsBuyLink || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="linuxBuyLink" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500">Linux Buy Link</label>
          <input type="text" id="linuxBuyLink" name="linuxBuyLink" value={product.linuxBuyLink || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-500 hover:scale-105">Update Product</button>
      </form>
    </div>
  );
}
