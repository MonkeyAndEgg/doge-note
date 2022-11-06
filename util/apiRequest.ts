export default async function apiRequest(url: string, options: RequestInit) {
  return await fetch(url, options);
}