"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
  userId: string;
  createdAt: string;
  user?: {
    name: string | null;
    email: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 py-12 md:py-16 max-w-4xl mx-auto">
        <Button variant="outline" className="mb-8" asChild>
          <Link href="/products">← Back to Products</Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.image && (
            <div className="w-full bg-muted rounded-lg overflow-hidden h-96">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Card>
            <CardContent className="pt-6">
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

              <p className="text-4xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>

              {product.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              {product.user && (
                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Seller
                  </h3>
                  <p className="text-lg font-semibold">
                    {product.user.name || product.user.email}
                  </p>
                </div>
              )}

              <div className="mt-8 space-y-3">
                <Button className="w-full" size="lg">
                  Add to Cart
                </Button>
                <Button className="w-full" variant="outline" size="lg" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
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
