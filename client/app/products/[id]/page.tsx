"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

/* ✅ Product type */
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const ProductDetailPage = () => {
  const params = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetail = async () => {
    try {
      const { data } = await axios.get<Product>(
        `https://fakestoreapi.com/products/${params.id}`
      );
      setProduct(data);
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">
        {/* Image */}
        <div className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="max-h-100 object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-wide text-gray-400">
            {product.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-justify">
            {product.description}
          </p>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-800 transition">
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
