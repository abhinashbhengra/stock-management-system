import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const uri =
    "mongodb+srv://abhinashbhengra170dx:l9abQOsXKfZHNLxu@cluster0.f4ibtv9.mongodb.net/";

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
  const uri =
    "mongodb+srv://abhinashbhengra170dx:l9abQOsXKfZHNLxu@cluster0.f4ibtv9.mongodb.net/";

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
