"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image?: string | null;
  status: boolean;
}

interface Props {
  properties: Property[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

function getImageUrl(image?: string | null) {
  if (!image) {
    return "/placeholder-property.jpg";
  }

  // If backend already returns a complete URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  // Convert:
  // /uploads/properties/file.png
  //
  // into:
  // http://localhost:8000/uploads/properties/file.png

  return `${API_URL.replace(/\/$/, "")}/${image.replace(
    /^\//,
    ""
  )}`;
}

export default function PropertyTable({
  properties,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow border overflow-x-auto">
      <table className="w-full">

        {/* HEADER */}
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">
              Image
            </th>

            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Location
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {properties.map((property) => {
            const imageUrl = getImageUrl(
              property.image
            );

            return (
              <tr
                key={property.id}
                className="border-t hover:bg-slate-50 transition"
              >

                {/* IMAGE */}
                <td className="p-4">
                  <div className="relative w-[70px] h-[50px] overflow-hidden rounded-lg bg-gray-100">

                    <Image
                      src={imageUrl}
                      alt={
                        property.title ||
                        "Property"
                      }
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="70px"
                      onError={() => {
                        console.error(
                          "Property image failed:",
                          imageUrl
                        );
                      }}
                    />

                  </div>
                </td>

                {/* TITLE */}
                <td className="p-4 font-medium">
                  {property.title}
                </td>

                {/* LOCATION */}
                <td className="p-4">
                  {property.location}
                </td>

                {/* PRICE */}
                <td className="p-4">
                  {property.price}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      property.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {property.status
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex justify-center gap-4">

                    <button
                      type="button"
                      onClick={() =>
                        onEdit(property.id)
                      }
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit property"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(property.id)
                      }
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete property"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            );
          })}

          {/* EMPTY */}
          {properties.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-8 text-gray-500"
              >
                No properties found.
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}