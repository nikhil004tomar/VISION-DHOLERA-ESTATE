import api from "./api";

export interface Property {
  id: number;
  title: string;
  slug: string;
  location: string;
  price: string;
  property_type: string;
  description: string;
  featured: boolean;
  status: boolean;
  image?: string | null;
}

export interface PropertyFormData {
  title: string;
  location: string;
  price: string;
  property_type: string;
  description: string;
  featured: boolean;
  status: boolean;
}

/*
|--------------------------------------------------------------------------
| Get all properties
|--------------------------------------------------------------------------
*/

export async function getProperties(): Promise<Property[]> {
  const res = await api.get("/api/properties/");

  return res.data;
}

/*
|--------------------------------------------------------------------------
| Get single property
|--------------------------------------------------------------------------
*/

export async function getProperty(
  id: number
): Promise<Property> {
  const res = await api.get(
    `/api/properties/${id}`
  );

  return res.data;
}

/*
|--------------------------------------------------------------------------
| Create property
|--------------------------------------------------------------------------
*/

export async function createProperty(
  data: PropertyFormData,
  image?: File
) {
  /*
   * First create the property.
   */
  const res = await api.post(
    "/api/properties/",
    data
  );

  const property = res.data;

  /*
   * If an image was selected,
   * upload it after property creation.
   */
  if (image && property?.id) {
    await uploadPropertyImage(
      property.id,
      image
    );
  }

  /*
   * Get the latest property so the returned
   * object contains the image path.
   */
  if (property?.id) {
    const updated = await getProperty(
      property.id
    );

    return updated;
  }

  return property;
}

/*
|--------------------------------------------------------------------------
| Update property
|--------------------------------------------------------------------------
*/

export async function updateProperty(
  id: number,
  data: PropertyFormData,
  image?: File
) {
  /*
   * Update normal property information.
   */
  const res = await api.put(
    `/api/properties/${id}`,
    data
  );

  /*
   * If a new image was selected,
   * upload/replace the image.
   */
  if (image) {
    await uploadPropertyImage(
      id,
      image
    );
  }

  /*
   * Return latest property data.
   */
  const updated = await getProperty(id);

  return updated;
}

/*
|--------------------------------------------------------------------------
| Delete property
|--------------------------------------------------------------------------
*/

export async function deleteProperty(
  id: number
) {
  const res = await api.delete(
    `/api/properties/${id}`
  );

  return res.data;
}

/*
|--------------------------------------------------------------------------
| Upload property image
|--------------------------------------------------------------------------
*/

export async function uploadPropertyImage(
  id: number,
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  /*
   * IMPORTANT:
   *
   * Do NOT manually set:
   *
   * Content-Type: multipart/form-data
   *
   * Axios/browser will automatically add the
   * correct multipart boundary.
   */
  const res = await api.post(
    `/api/properties/${id}/image`,
    formData
  );

  return res.data;
}