import { useState } from 'react';
import ProductList from '@/components/ProductList';
import AddProductForm from '@/components/AddProductForm';
import EditProductForm from '@/components/EditProductForm';
import { Product } from '@/types/product';
import CreateBlogPostForm from '@/components/blog/CreateBlogPostForm';

export default function AdminPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('products');

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-500">Admin Panel</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400 transition-colors duration-500">Welcome to the admin panel!</p>

      <div className="flex border-b border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'products'
            ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          } transition-colors duration-500`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`py-2 px-4 font-semibold ${activeTab === 'posts'
            ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          } transition-colors duration-500`}
          onClick={() => setActiveTab('posts')}
        >
          Add Posts
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'products' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-500">Product Section</h2>
            <ProductList onEditProduct={handleEditProduct} />
            {selectedProduct ? (
              <EditProductForm productId={selectedProduct._id} />
            ) : (
              <AddProductForm />
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-500">Add Posts Section</h2>
            <CreateBlogPostForm />
          </div>
        )}
      </div>
    </div>
  );
}
