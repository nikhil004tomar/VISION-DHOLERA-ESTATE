import api from "./api";

export async function getGallery() {
  const res = await api.get("/api/gallery/");
  return res.data;
}

export async function uploadGallery(
  title: string,
  file: File
) {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  const res = await api.post(
    "/api/gallery/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

export async function deleteGallery(id: number) {
  const res = await api.delete(
    `/api/gallery/${id}`
  );

  return res.data;
}