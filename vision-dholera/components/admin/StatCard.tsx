import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl">
        {icon}
      </div>
    </div>
  );
}