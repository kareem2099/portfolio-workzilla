import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { id } = params;

    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { id } = params;

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

    try {
      await db.collection("products").updateOne(
        { _id: new ObjectId(id) },
        { $set: product }
      );
    } catch (e) {
      console.log(e);
    }

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { id } = params;

    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to delete product' }, { status: 500 });
  }
}
