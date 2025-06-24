import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

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

    await db.collection("products").insertOne(product);

    return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create product' }, { status: 500 });
  }
}
