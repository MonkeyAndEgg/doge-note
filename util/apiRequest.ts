export default async function apiRequest(url: string, options: RequestInit) {
  return await fetch('http://localhost:3000' + url, options);
}