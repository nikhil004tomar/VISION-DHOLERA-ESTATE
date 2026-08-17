"use client";

import { useEffect, useState } from "react";

import {
  Building2,
  Mail,
  Image,
  CheckCircle,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";

import { getDashboardStats } from "@/lib/dashboard";

export default function DashboardPage() {

  const [stats, setStats] = useState({
    properties: 0,
    inquiries: 0,
    gallery: 0,
    active_properties: 0,
  });

  useEffect(() => {

    async function loadDashboard() {

      try {

        const data = await getDashboardStats();

        setStats(data);

      } catch (err) {

        console.error(err);

      }

    }

    loadDashboard();

  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Properties"
          value={stats.properties}
          icon={<Building2 className="text-blue-600" />}
        />

        <StatCard
          title="Inquiries"
          value={stats.inquiries}
          icon={<Mail className="text-green-600" />}
        />

        <StatCard
          title="Gallery"
          value={stats.gallery}
          icon={<Image className="text-purple-600" />}
        />

        <StatCard
          title="Active"
          value={stats.active_properties}
          icon={<CheckCircle className="text-orange-600" />}
        />

      </div>

    </div>
  );
}