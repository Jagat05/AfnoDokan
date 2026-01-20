"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  ChartData,
} from "chart.js";

// Register Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

// Type for a product
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

// Type for category count
type CategoryCount = {
  category: string;
  count: number;
};

// Helper function to count categories
function getCategoryCounts(products: Product[]): CategoryCount[] {
  const counts: Record<string, number> = {};

  products.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });

  return Object.entries(counts).map(([category, count]) => ({
    category,
    count,
  }));
}

const AdminDashboard = () => {
  const [categoryData, setCategoryData] = useState<CategoryCount[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          "https://fakestoreapi.com/products",
        );
        setCategoryData(getCategoryCounts(res.data));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Typed Chart Data
  const chartData: ChartData<"polarArea", number[], string> = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        label: "Number of Products",
        data: categoryData.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Typed Chart Options
  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Products by Category (Polar Area Chart)",
      },
    },
    scales: {
      r: {
        ticks: {
          font: {
            weight: "bold",
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-100 p-8">
      <div className="bg-indigo-600 p-8 rounded-3xl text-white">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-indigo-100">
          Manage products, orders, users, and settings.
        </p>
      </div>

      {/* Bigger chart container */}
      <div className="mt-8 bg-white p-4 rounded-xl shadow-md mx-auto w-[700px] h-[700px]">
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AdminDashboard;
