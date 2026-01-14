"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  ShoppingCart,
  Package,
  BarChart2,
  Settings,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: Home, path: "/admin" },
    { name: "Customers", icon: Users, path: "/admin/customer" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Sales", icon: BarChart2, path: "/admin/sales" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-indigo-600 text-gray-200 flex flex-col shadow-lg">
      <div className="px-6 py-5 text-2xl font-bold text-white">Admin Panel</div>

      <nav className="flex-1 px-3 space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-900 text-white"
                    : "text-gray-400 hover:bg-indigo-900 hover:text-white"
                }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 text-xs text-gray-500">© 2026 Aafno Dokan</div>
    </aside>
  );
}
