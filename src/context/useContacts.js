// src/context/useContacts.js
import { createContext, useContext } from 'react';

export const ContactsContext = createContext(null);

export function useContacts() {
  return useContext(ContactsContext);
}
