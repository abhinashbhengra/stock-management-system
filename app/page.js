"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function Home() {
  const [stockData, setStockData] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("productName");

  const router = useRouter();

  let displayProducts = stockData;

  if (filterCriteria === "productName") {
    displayProducts = displayProducts.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterCriteria === "quantity") {
    displayProducts = displayProducts.filter((item) =>
      item.quantity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterCriteria === "price") {
    displayProducts = displayProducts.filter((item) =>
      item.price.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter stockData based on the search term and filter criteria

    // setStockData(filteredStock);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(productName, quantity, price);

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          productName,
          quantity,
          price,
        }),
      });

      if (res.ok) {
        console.log("Product added successfully");
      } else {
        console.log("Error adding Product");
      }

      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
    setProductName("");
    setQuantity("");
    setPrice(0);

    router.refresh();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/product", {
        method: "GET",
        cache: "no-store",
      });
      const { products } = await response.json();
      setStockData(products);
      console.log(products);
    };
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <h2 className="text-lg font-semibold mb-2">Search a Product</h2>
        <div className="mt-4">
          <div className="mb-4">
            <label htmlFor="search">Search by:</label>
            <select
              id="search"
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="border p-2"
            >
              <option value="productName">Product Name</option>
              <option value="quantity">Quantity</option>
              <option value="price">Price</option>
              {/* Add more filter options as needed */}
            </select>
            <input
              type="text"
              placeholder={`Search by ${filterCriteria}`}
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2"
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Add Product</h2>
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Product Slug"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Product
            </button>
          </form>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Current Stock</h2>
          {stockData.length < 1 && <p>Loading...</p>}
          {stockData.length > 1 && (
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Product Name</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price</th> {/* New Price header */}
                </tr>
              </thead>

              <tbody>
                {stockData &&
                  displayProducts.map((item) => (
                    <tr key={item.id} className="border">
                      <td className="border p-2">{item._id}</td>
                      <td className="border p-2">{item.productName}</td>
                      <td className="border p-2">{item.quantity}</td>
                      <td className="border p-2">₹{item.price}</td>{" "}
                      {/* New Price cell */}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
