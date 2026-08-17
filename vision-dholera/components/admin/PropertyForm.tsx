"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface PropertyFormData {
  title: string;
  location: string;
  price: string;
  property_type: string;
  description: string;
  featured: boolean;
  status: boolean;
}

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData> & {
    image?: string | null;
  };

  onSubmit: (
    data: PropertyFormData,
    image?: File
  ) => Promise<void>;
}

export default function PropertyForm({
  initialData,
  onSubmit,
}: PropertyFormProps) {
  const [image, setImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PropertyFormData>({
    defaultValues: {
      title: initialData?.title || "",
      location: initialData?.location || "",
      price: initialData?.price || "",
      property_type:
        initialData?.property_type ||
        "Residential",
      description:
        initialData?.description || "",
      featured:
        initialData?.featured ?? false,
      status:
        initialData?.status ?? true,
    },
  });

  /*
   * Existing image preview when editing
   */
  useEffect(() => {
    if (!initialData?.image) {
      setPreview(null);
      return;
    }

    if (
      initialData.image.startsWith("http://") ||
      initialData.image.startsWith("https://")
    ) {
      setPreview(initialData.image);
      return;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000";

    setPreview(
      `${apiUrl.replace(/\/$/, "")}/${initialData.image.replace(
        /^\//,
        ""
      )}`
    );
  }, [initialData?.image]);

  /*
   * Handle image selection
   */
  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);

    /*
     * Create local preview
     */
    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
  }

  /*
   * Submit
   */
  async function submitForm(
    data: PropertyFormData
  ) {
    await onSubmit(data, image);
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white rounded-xl shadow border p-8 space-y-6"
    >

      {/* ========================= */}
      {/* TITLE */}
      {/* ========================= */}

      <div>
        <label
          htmlFor="title"
          className="block mb-2 font-medium"
        >
          Property Title
        </label>

        <input
          id="title"
          {...register("title", {
            required:
              "Property title is required",
          })}
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter property title"
          disabled={isSubmitting}
        />

        {errors.title && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* ========================= */}
      {/* LOCATION + PRICE */}
      {/* ========================= */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block mb-2 font-medium"
          >
            Location
          </label>

          <input
            id="location"
            {...register("location", {
              required:
                "Location is required",
            })}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Dholera, Gujarat"
            disabled={isSubmitting}
          />

          {errors.location && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block mb-2 font-medium"
          >
            Price
          </label>

          <input
            id="price"
            {...register("price", {
              required:
                "Price is required",
            })}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="₹25 Lakh"
            disabled={isSubmitting}
          />

          {errors.price && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.price.message}
            </p>
          )}
        </div>

      </div>

      {/* ========================= */}
      {/* PROPERTY TYPE */}
      {/* ========================= */}

      <div>
        <label
          htmlFor="property_type"
          className="block mb-2 font-medium"
        >
          Property Type
        </label>

        <select
          id="property_type"
          {...register("property_type")}
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          <option value="Residential">
            Residential
          </option>

          <option value="Commercial">
            Commercial
          </option>

          <option value="Industrial">
            Industrial
          </option>

          <option value="Agricultural">
            Agricultural
          </option>
        </select>
      </div>

      {/* ========================= */}
      {/* DESCRIPTION */}
      {/* ========================= */}

      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          rows={5}
          {...register("description", {
            required:
              "Description is required",
          })}
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter property description..."
          disabled={isSubmitting}
        />

        {errors.description && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* ========================= */}
      {/* CHECKBOXES */}
      {/* ========================= */}

      <div className="flex flex-wrap gap-8">

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("featured")}
            disabled={isSubmitting}
            className="w-4 h-4"
          />

          <span>
            Featured Property
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("status")}
            disabled={isSubmitting}
            className="w-4 h-4"
          />

          <span>
            Active
          </span>
        </label>

      </div>

      {/* ========================= */}
      {/* IMAGE */}
      {/* ========================= */}

      <div>

        <label
          htmlFor="property-image"
          className="block mb-2 font-medium"
        >
          Property Image
        </label>

        <input
          id="property-image"
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp,image/avif"
          onChange={handleImageChange}
          disabled={isSubmitting}
          className="w-full border rounded-lg p-3"
        />

        <p className="mt-2 text-sm text-gray-500">
          JPG, PNG, WEBP or AVIF
        </p>

      </div>

      {/* ========================= */}
      {/* IMAGE PREVIEW */}
      {/* ========================= */}

      {preview && (
        <div>

          <p className="font-medium mb-3">
            Image Preview
          </p>

          <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden border bg-gray-100">

            <img
              src={preview}
              alt="Property preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(
                  "Image preview failed:",
                  preview
                );

                e.currentTarget.style.display =
                  "none";
              }}
            />

          </div>

        </div>
      )}

      {/* ========================= */}
      {/* SUBMIT */}
      {/* ========================= */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? "Saving..."
          : "Save Property"}
      </button>

    </form>
  );
}