import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product"; // Import the new Product model

export async function GET() {
  try {
    await dbConnect(); // Ensure Mongoose is connected
    const products = await Product.find({});

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect(); // Ensure Mongoose is connected
    const body = await request.json();

    const product = {
      name: body.name,
      description: body.description,
      priceLinux: body.priceLinux,
      priceWindows: body.priceWindows,
      imageUrl: body.imageUrl,
      techStack: body.techStack,
      windowsBuyLink: body.windowsBuyLink,
      linuxBuyLink: body.linuxBuyLink,
    };

    await Product.create(product); // Use Mongoose model to create product

    return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create product' }, { status: 500 });
  }
}
