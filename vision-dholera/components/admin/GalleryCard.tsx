"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

interface Props {
  item: any;
  onDelete(id: number): void;
}

export default function GalleryCard({
  item,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <Image
        src={`http://127.0.0.1:8000${item.image}`}
        alt={item.title}
        width={400}
        height={250}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">

        <h3 className="font-semibold">
          {item.title}
        </h3>

        <button
          onClick={() => onDelete(item.id)}
          className="mt-4 flex items-center gap-2 text-red-600"
        >
          <Trash2 size={18} />

          Delete

        </button>

      </div>

    </div>
  );
}