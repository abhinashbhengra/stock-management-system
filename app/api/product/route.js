import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock-management");
    const inventory = database.collection("inventory");

    const query = {};
    const products = await inventory.find(query).toArray();

    // console.log(products);
    return NextResponse.json({ products }, { status: 200 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const body = await request.json();
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock-management");
    const inventory = database.collection("inventory");

    const product = await inventory.insertOne(body);

    console.log(product);
    return NextResponse.json({ product, ok: true }, { status: 200 });
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  console.log(id);
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock-management");
    const inventory = database.collection("inventory");

    const product = await inventory.deleteOne({
      _id: new ObjectId(id),
    });

    console.log(product);
    return NextResponse.json({ message: "Product Deleted" });
  } finally {
    await client.close();
  }
}
