// src/services/contactService.js
const API_URL = import.meta.env.VITE_API_URL;
let requestCount = 0;

export async function fetchContacts() {
  requestCount++;

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export function getRequestCount() {
  return requestCount;
}
