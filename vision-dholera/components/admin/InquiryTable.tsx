"use client";

import {
  CheckCircle,
  Trash2,
  MessageSquare,
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

interface Props {
  inquiries: Inquiry[];
  onDelete: (id: number) => void;
  onStatus: (id: number) => void;
}

export default function InquiryTable({
  inquiries,
  onDelete,
  onStatus,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          {/* HEADER */}

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Message
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          {/* BODY */}

          <tbody>

            {inquiries.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* NAME */}

                <td className="p-4 font-medium text-gray-900">
                  {item.name}
                </td>

                {/* PHONE */}

                <td className="p-4 text-gray-600 whitespace-nowrap">
                  {item.phone}
                </td>

                {/* EMAIL */}

                <td className="p-4 text-gray-600">
                  {item.email}
                </td>

                {/* MESSAGE */}

                <td className="p-4 max-w-[400px]">

                  <div className="flex items-start gap-2">

                    <MessageSquare
                      size={18}
                      className="text-blue-500 mt-1 flex-shrink-0"
                    />

                    <p
                      className="text-gray-700 whitespace-pre-wrap break-words"
                      title={item.message}
                    >
                      {item.message || "No message"}
                    </p>

                  </div>

                </td>

                {/* STATUS */}

                <td className="p-4">

                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === "New"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                {/* DATE */}

                <td className="p-4 text-gray-600 whitespace-nowrap">
                  {item.created_at
                    ? new Date(
                        item.created_at
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* ACTIONS */}

                <td className="p-4">

                  <div className="flex justify-center gap-4">

                    <button
                      type="button"
                      onClick={() =>
                        onStatus(item.id)
                      }
                      title="Mark as completed"
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      <CheckCircle size={21} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(item.id)
                      }
                      title="Delete inquiry"
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={21} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

            {/* EMPTY */}

            {inquiries.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-12 text-gray-500"
                >
                  No inquiries found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}