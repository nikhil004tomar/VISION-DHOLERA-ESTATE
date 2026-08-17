"use client";

import { useState, useRef } from "react";

interface Props {
  onUpload: (
    title: string,
    file: File
  ) => Promise<void>;
}

export default function GalleryUpload({
  onUpload,
}: Props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter image title.");
      return;
    }

    if (!file) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      await onUpload(title.trim(), file);

      setTitle("");
      setFile(null);

      // Reset the form safely
      formRef.current?.reset();

      alert("Image uploaded successfully.");
    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.detail ||
        "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="bg-white rounded-xl shadow p-6 mb-8"
    >
      <div className="grid md:grid-cols-3 gap-6">

        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

      </div>
    </form>
  );
}