"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { div } from "framer-motion/client";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-center font-bold mb-15 text-indigo-600 text-3xl ">
        <h2>Explore Our Products</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>

            <h2 className="mt-4 font-semibold text-sm line-clamp-2">
              {product.title}
            </h2>

            <p className="text-indigo-600 font-bold mt-2">${product.price}</p>

            <button className="mt-auto bg-indigo-600 text-white rounded-xl py-2 hover:bg-indigo-700 transition">
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Product;
