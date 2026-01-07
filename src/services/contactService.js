// src/services/contactService.js
import { transformContactsFromAPI, transformContactFromAPI, transformContactToAPI } from '../components/utils/groupMapping';

const API_URL = import.meta.env.VITE_API_URL;
let requestCount = 0;

// GET all contacts
export async function fetchContacts() {
  requestCount++;
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();
  // Transform API data (type) to App (group)
  return transformContactsFromAPI(data);
}

// POST create contact
export async function createContact(contactData) {
  // Transform App data (group) to API (type)
  const apiData = transformContactToAPI(contactData);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiData),
  });
  if (!response.ok) throw new Error(`Error creating contact: ${response.status}`);
  const data = await response.json();
  // Transform API response (type) to App (group)
  return transformContactFromAPI(data);
}

// PUT update contact
export async function updateContact(id, contactData) {
  // Transform App data (group) to API (type)
  const apiData = transformContactToAPI(contactData);

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiData),
  });
  if (!response.ok) throw new Error(`Error updating contact: ${response.status}`);
  const data = await response.json();
  // Transform API response (type) to App (group)
  return transformContactFromAPI(data);
}

// DELETE contact
export async function deleteContact(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Error deleting contact: ${response.status}`);
  return await response.json();
}

export function getRequestCount() {
  return requestCount;
}
