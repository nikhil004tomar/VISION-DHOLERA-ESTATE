import api from "./api";

export async function getDashboardStats() {
  const res = await api.get("/api/dashboard/stats");

  return res.data;
}