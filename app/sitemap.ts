import type { MetadataRoute } from "next";

const routes = ["", "/login", "/dashboard", "/students", "/teachers", "/parents", "/attendance", "/exams", "/fees", "/settings"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kindervale.example.com";
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
