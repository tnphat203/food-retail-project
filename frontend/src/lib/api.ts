export async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  return res.json();
}
