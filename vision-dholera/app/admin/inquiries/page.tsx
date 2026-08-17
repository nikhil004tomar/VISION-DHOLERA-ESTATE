"use client";

import {
  useEffect,
  useState,
} from "react";

import InquiryTable from "@/components/admin/InquiryTable";

import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "@/lib/inquiry";

export default function InquiryPage() {

  const [inquiries, setInquiries] =
    useState([]);

  async function loadData() {

    const data =
      await getInquiries();

    setInquiries(data);

  }

  useEffect(() => {

    loadData();

  }, []);

  async function handleDelete(
    id: number
  ) {

    if (
      !confirm(
        "Delete this inquiry?"
      )
    )
      return;

    await deleteInquiry(id);

    loadData();

  }

  async function handleStatus(
    id: number
  ) {

    await updateInquiryStatus(
      id,
      "Contacted"
    );

    loadData();

  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Inquiries
      </h1>

      <InquiryTable
        inquiries={inquiries}
        onDelete={handleDelete}
        onStatus={handleStatus}
      />

    </div>
  );
}