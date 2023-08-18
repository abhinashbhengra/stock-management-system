import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  // const { MongoClient } = require("mongodb");

  // Replace the uri string with your connection string.
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock-management");
    const movies = database.collection("inventory");

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const movie = await movies.find(query).toArray();

    console.log(movie);
    return NextResponse.json({ message: "hello", movie }, { status: 200 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
