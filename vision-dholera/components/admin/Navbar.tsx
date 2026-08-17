"use client";

import { Bell, UserCircle } from "lucide-react";

export default function NavBar() {
  return (
    <header className="bg-white border-b px-8 h-20 flex items-center justify-between">

      <div>

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

      </div>

      <div className="flex items-center gap-6">

        <Bell />

        <div className="flex items-center gap-2">

          <UserCircle size={35} />

          <div>

            <h3 className="font-semibold">
              Administrator
            </h3>

            <p className="text-sm text-gray-500">
              admin@visiondholera.com
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}