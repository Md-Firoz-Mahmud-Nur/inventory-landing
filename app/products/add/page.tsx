"use client";

import { Navbar } from "@/components/navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          price: parseFloat(formData.price),
          image: formData.image || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create product");
      }

      router.push("/products/manage");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="px-4 py-12 md:py-16 max-w-2xl mx-auto">
        <Link
          href="/products"
          className="text-primary hover:underline mb-8 inline-block">
          ← Back to Products
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Add New Product</CardTitle>
            <CardDescription>
              Create and list a new product for sale
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2">
                  Product Title *
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={5}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium mb-2">
                  Price (USD) *
                </label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium mb-2">
                  Image URL
                </label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  disabled={isLoading}
                />
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Preview:
                    </p>
                    <Image
                      src={formData.image}
                      alt="Product preview"
                      className="w-full max-w-sm h-40 object-cover rounded-lg"
                      onError={() => {
                        // Handle image load error
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="flex-1">
                  {isLoading ? "Creating..." : "Create Product"}
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link href="/products">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
