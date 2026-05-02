import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="px-4 py-16 md:py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-balance">
          About Us
        </h1>

        <div className="space-y-8 text-lg text-muted-foreground">
          <p>
            Welcome to Shop, your trusted destination for quality products and
            exceptional customer service. Founded with a mission to
            revolutionize online shopping, we&apos;ve grown into a community of
            millions of satisfied customers worldwide.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p>
              We believe that online shopping should be simple, secure, and
              enjoyable. Our mission is to connect customers with high-quality
              products from trusted sellers, while providing an unmatched
              shopping experience backed by excellent customer support.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quality First</CardTitle>
                </CardHeader>
                <CardContent>
                  We ensure every product meets our high standards before
                  reaching our customers.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  Your satisfaction is our top priority, backed by our
                  comprehensive buyer protection.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  We believe in honest pricing and clear communication with our
                  customers.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  We continuously improve our platform to serve you better.
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why Shop With Us?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>
                  Curated selection of quality products from verified sellers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Secure payment processing and buyer protection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Fast and reliable shipping options</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Easy returns and refunds</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
