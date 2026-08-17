"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Mail,
  Image,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

const menu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    href: "/admin/properties",
    icon: Building2,
  },
  {
    title: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen flex flex-col">

      {/* Header */}

      <div className="border-b border-slate-700 p-6">
        <h2 className="text-2xl font-bold">
          Vision Dholera
        </h2>

        <p className="text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}

      <nav className="mt-6 flex-1">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-4 transition ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="p-6">
        <LogoutButton />
      </div>

    </aside>
  );
}