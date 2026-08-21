import type { MetadataRoute } from "next";

const BASE_URL = "https://visiondholera.com";
const API_URL = "https://api.visiondholera.com";

interface Property {
  slug: string;
  created_at?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/project`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const response = await fetch(
      `${API_URL}/api/properties/public`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      console.error("Sitemap API error:", response.status);
      return staticPages;
    }

    const properties: Property[] = await response.json();

    const projectPages: MetadataRoute.Sitemap = properties
      .filter((property) => property.slug)
      .map((property) => ({
        url: `${BASE_URL}/project/${encodeURIComponent(
          property.slug
        )}`,
        lastModified: property.created_at
          ? new Date(property.created_at)
          : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [
      ...staticPages,
      ...projectPages,
    ];
  } catch (error) {
    console.error(
      "Failed to generate project sitemap:",
      error
    );

    return staticPages;
  }
}