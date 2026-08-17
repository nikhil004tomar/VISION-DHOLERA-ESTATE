"use client";

import {
  useEffect,
  useState,
} from "react";

import GalleryCard from "@/components/admin/GalleryCard";

import GalleryUpload from "@/components/admin/GalleryUpload";

import {
  getGallery,
  uploadGallery,
  deleteGallery,
} from "@/lib/gallery";

export default function GalleryPage() {

  const [gallery, setGallery] =
    useState([]);

  async function loadGallery() {

    const data =
      await getGallery();

    setGallery(data);

  }

  useEffect(() => {

    loadGallery();

  }, []);

  async function handleUpload(
    title: string,
    file: File
  ) {

    await uploadGallery(
      title,
      file
    );

    loadGallery();

  }

  async function handleDelete(
    id: number
  ) {

    if (
      !confirm(
        "Delete image?"
      )
    )
      return;

    await deleteGallery(id);

    loadGallery();

  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Gallery
      </h1>

      <GalleryUpload
        onUpload={
          handleUpload
        }
      />

      <div className="grid md:grid-cols-3 gap-8">

        {gallery.map((item: any) => (

          <GalleryCard
            key={item.id}
            item={item}
            onDelete={
              handleDelete
            }
          />

        ))}

      </div>

    </div>
  );
}