'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
  userId: string;
  createdAt: string;
}

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Products</h1>
            {user && (
              <Button asChild>
                <Link href="/products/add">Add Product</Link>
              </Button>
            )}
          </div>

          <div className="w-full max-w-sm">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {products.length === 0 ? 'No products available yet.' : 'No products match your search.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    {product.image && (
                      <div className="w-full h-40 bg-muted overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                      {product.description && (
                        <CardDescription className="line-clamp-2">
                          {product.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border bg-muted/50 mt-16">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
