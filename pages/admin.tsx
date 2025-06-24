import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import ProductList from '@/components/ProductList';
import AddProductForm from '@/components/AddProductForm';
import EditProductForm from '@/components/EditProductForm';
import { Product } from '@/types/product';


export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loggedIn = getCookie('loggedIn');

    if (loggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-500">Admin Panel</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400 transition-colors duration-500">Welcome to the admin panel!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ProductList onEditProduct={handleEditProduct} />
        </div>
        <div>
          {selectedProduct ? (
            <EditProductForm productId={selectedProduct._id} />
          ) : (
            <AddProductForm />
          )}
        </div>
      </div>
    </div>
  );
}
