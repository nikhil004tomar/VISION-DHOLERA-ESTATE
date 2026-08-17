"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PropertyForm from "@/components/admin/PropertyForm";

import {
  getProperty,
  updateProperty,
  uploadPropertyImage,
} from "@/lib/property";

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const propertyId = Number(params.id);

  // ==========================================
  // LOAD PROPERTY
  // ==========================================

  useEffect(() => {
    if (!propertyId || Number.isNaN(propertyId)) {
      setLoading(false);
      return;
    }

    async function loadProperty() {
      try {
        const data = await getProperty(propertyId);

        console.log("Property loaded:", data);

        setProperty(data);
      } catch (error: any) {
        console.error(
          "Load property error:",
          error
        );

        if (error?.response?.status === 401) {
          alert(
            "Your session has expired. Please login again."
          );

          router.replace("/admin/login");
          return;
        }

        if (error?.response?.status === 404) {
          setProperty(null);
          return;
        }

        alert(
          error?.response?.data?.detail ||
            "Failed to load property."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [propertyId, router]);

  // ==========================================
  // UPDATE PROPERTY
  // ==========================================

  async function handleUpdate(
    data: any,
    image?: File
  ) {
    if (!propertyId || Number.isNaN(propertyId)) {
      alert("Invalid property ID.");
      return;
    }

    setSaving(true);

    try {
      // Generate slug from title
      const slug = data.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/^-+|-+$/g, "");

      const payload = {
        title: data.title,
        slug,
        location: data.location,
        price: data.price,
        property_type: data.property_type,
        description: data.description,

        featured: Boolean(data.featured),

        // Important:
        // false must remain false
        status: data.status !== false,
      };

      console.log(
        "Updating property:",
        payload
      );

      // ------------------------------------------
      // Update property information
      // ------------------------------------------

      const updatedProperty =
        await updateProperty(
          propertyId,
          payload
        );

      console.log(
        "Property updated:",
        updatedProperty
      );

      // ------------------------------------------
      // Upload new image if selected
      // ------------------------------------------

      if (image) {
        console.log(
          "Uploading new image:",
          image.name
        );

        const uploadResponse =
          await uploadPropertyImage(
            propertyId,
            image
          );

        console.log(
          "Image uploaded:",
          uploadResponse
        );
      }

      // ------------------------------------------
      // Success
      // ------------------------------------------

      alert(
        "Property updated successfully!"
      );

      router.push(
        "/admin/properties"
      );

      router.refresh();

    } catch (error: any) {
      console.error(
        "Update property error:",
        error
      );

      if (
        error?.response?.status === 401
      ) {
        alert(
          "Your session has expired. Please login again."
        );

        router.replace(
          "/admin/login"
        );

        return;
      }

      alert(
        error?.response?.data?.detail ||
          error?.message ||
          "Failed to update property."
      );

    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="p-8">

        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8" />

          <div className="h-40 bg-gray-200 rounded-xl" />
        </div>

      </div>
    );
  }

  // ==========================================
  // INVALID ID
  // ==========================================

  if (
    !propertyId ||
    Number.isNaN(propertyId)
  ) {
    return (
      <div className="p-8">

        <h1 className="text-2xl font-bold text-red-600">
          Invalid Property ID
        </h1>

        <button
          onClick={() =>
            router.push(
              "/admin/properties"
            )
          }
          className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Back to Properties
        </button>

      </div>
    );
  }

  // ==========================================
  // PROPERTY NOT FOUND
  // ==========================================

  if (!property) {
    return (
      <div className="p-8">

        <h1 className="text-2xl font-bold text-red-600">
          Property Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          The property you are trying to edit
          does not exist.
        </p>

        <button
          onClick={() =>
            router.push(
              "/admin/properties"
            )
          }
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          Back to Properties
        </button>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="max-w-5xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Edit Property
        </h1>

        <p className="text-gray-500 mt-2">
          Update property details and image.
        </p>

      </div>

      {saving && (
        <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-blue-700">
          Saving property...
        </div>
      )}

      <PropertyForm
        initialData={property}
        onSubmit={handleUpdate}
      />

    </div>
  );
}