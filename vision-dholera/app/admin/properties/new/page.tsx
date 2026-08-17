"use client";

import { useRouter } from "next/navigation";

import PropertyForm from "@/components/admin/PropertyForm";

import {
  createProperty,
  uploadPropertyImage,
} from "@/lib/property";

export default function NewPropertyPage() {
  const router = useRouter();

  async function handleCreate(
    data: any,
    image?: File
  ) {
    try {
      // -----------------------------------------
      // Generate slug
      // -----------------------------------------
      const slug = data.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/^-+|-+$/g, "");

      // -----------------------------------------
      // Create property
      // -----------------------------------------
      const payload = {
        title: data.title,
        slug,
        location: data.location,
        price: data.price,
        property_type: data.property_type,
        description: data.description,

        featured: Boolean(data.featured),
        status: data.status !== false,
      };

      console.log("Creating property:", payload);

      const property = await createProperty(payload);

      console.log("Property created:", property);

      // -----------------------------------------
      // Upload image
      // -----------------------------------------
      if (image) {
        console.log("Uploading image:", image.name);

        const uploadResponse =
          await uploadPropertyImage(
            property.id,
            image
          );

        console.log(
          "Image uploaded:",
          uploadResponse
        );
      }

      // -----------------------------------------
      // Success
      // -----------------------------------------
      alert(
        "Property created successfully!"
      );

      router.push(
        "/admin/properties"
      );

      router.refresh();

    } catch (error: any) {
      console.error(
        "Create property error:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to create property.";

      alert(message);
    }
  }

  return (
    <div className="max-w-5xl">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add Property
        </h1>

        <p className="text-gray-500 mt-2">
          Add a new property to your projects.
        </p>
      </div>

      <PropertyForm
        onSubmit={handleCreate}
      />

    </div>
  );
}