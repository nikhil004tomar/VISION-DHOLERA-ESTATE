"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PropertyTable from "@/components/admin/PropertyTable";
import {
  getProperties,
  deleteProperty,
} from "@/lib/property";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image?: string | null;
  status: boolean;
}

export default function PropertiesPage() {
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProperties() {
    try {
      setLoading(true);
      setError("");

      const data = await getProperties();

      console.log("Properties loaded:", data);

      setProperties(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to load properties:",
        error
      );

      setError(
        "Failed to load properties. Please try again."
      );

      setProperties([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Delete this property?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProperty(id);

      await loadProperties();

    } catch (error: any) {
      console.error(
        "Delete property error:",
        error
      );

      alert(
        error?.response?.data?.detail ||
        "Failed to delete property."
      );
    }
  }

  function handleAddProperty() {
    router.push("/admin/properties/new");
  }

  function handleEditProperty(id: number) {
    router.push(
      `/admin/properties/${id}/edit`
    );
  }

  return (
    <div>

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Properties
          </h1>

          {!loading && (
            <p className="text-gray-500 mt-1">
              {properties.length}{" "}
              {properties.length === 1
                ? "property"
                : "properties"}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddProperty}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Property
        </button>

      </div>

      {/* ========================= */}
      {/* ERROR */}
      {/* ========================= */}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          {error}

          <button
            type="button"
            onClick={loadProperties}
            className="ml-4 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* ========================= */}
      {/* LOADING */}
      {/* ========================= */}

      {loading ? (
        <div className="bg-white rounded-xl shadow border p-10 text-center">
          <p className="text-gray-500">
            Loading properties...
          </p>
        </div>
      ) : (
        <PropertyTable
          properties={properties}
          onDelete={handleDelete}
          onEdit={handleEditProperty}
        />
      )}

    </div>
  );
}