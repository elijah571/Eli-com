export const baseURL =
  process.env.NODE_ENV === "production"
    ? "" // Use relative URLs for production (Vercel)
    : "http://localhost:3000"; // Use localhost in development
