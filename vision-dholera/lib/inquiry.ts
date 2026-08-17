import api from "./api";

export interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Create inquiry (Public)
export async function createInquiry(data: InquiryForm) {
  const res = await api.post(
    "/api/inquiries/public",
    data
  );

  return res.data;
}

// Admin - Get all inquiries
export async function getInquiries() {
  const res = await api.get("/api/inquiries");
  return res.data;
}

// Admin - Update status
export async function updateInquiryStatus(
  id: number,
  status: string
) {
  const res = await api.put(
    `/api/inquiries/${id}/status`,
    null,
    {
      params: { status },
    }
  );

  return res.data;
}

// Admin - Delete inquiry
export async function deleteInquiry(id: number) {
  const res = await api.delete(
    `/api/inquiries/${id}`
  );

  return res.data;
}