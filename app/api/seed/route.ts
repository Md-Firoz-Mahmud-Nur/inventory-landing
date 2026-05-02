import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Check if demo user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "demo@example.com" },
    });

    let userId: string;

    if (!existingUser) {
      // Create demo user
      const hashedPassword = await hashPassword("demo123");
      const user = await prisma.user.create({
        data: {
          email: "demo@example.com",
          password: hashedPassword,
          name: "Demo User",
        },
      });
      userId = user.id;
    } else {
      userId = existingUser.id;
    }

    // Clear existing demo products (optional - for fresh demo data)
    await prisma.product.deleteMany({
      where: { userId },
    });

    // Create demo products
    const demoProducts = [
      {
        title: "Wireless Headphones",
        description:
          "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        userId,
      },
      {
        title: "Smart Watch",
        description:
          "Feature-rich smartwatch with health tracking, GPS, and water resistance up to 50m.",
        price: 299.99,
        image: "/placeholder.svg?height=300&width=300",
        userId,
      },
      {
        title: "USB-C Cable",
        description:
          "Durable 2-meter USB-C cable with fast charging support up to 100W.",
        price: 19.99,
        image: "/placeholder.svg?height=300&width=300",
        userId,
      },
      {
        title: "Portable Charger",
        description:
          "20,000mAh portable charger with dual USB outputs and LED display.",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        userId,
      },
      {
        title: "Phone Case",
        description:
          "Protective phone case with shockproof design and premium materials.",
        price: 29.99,
        image: "/placeholder.svg?height=300&width=300",
        userId,
      },
      {
        title: "Screen Protector",
        description:
          "Tempered glass screen protector with 9H hardness and easy installation.",
        price: 9.99,
        image: "/placeholder.svg?height=300&width=300",
        userId,
      },
    ];

    const createdProducts = await prisma.product.createMany({
      data: demoProducts,
    });

    return NextResponse.json(
      {
        message: "Demo data seeded successfully",
        user: {
          email: "demo@example.com",
          password: "demo123",
        },
        productsCreated: createdProducts.count,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed demo data" },
      { status: 500 },
    );
  }
}
