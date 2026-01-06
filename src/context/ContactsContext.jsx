import React, { createContext, useState, useCallback, useMemo } from 'react';
import { fetchContacts } from '../services/contactService';

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isCreateOpen, setCreateOpen] = useState(false);

  // 🔹 Load contacts from API (via service)
  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addContact = useCallback((contact) => {
    console.log("🔥 ADD CONTACT CALLED WITH:", contact);
    console.log("🚨 KEYS:", Object.keys(contact));
    
    
    // Ensure a unique id; use Date.now() for simplicity
    const id = Date.now();
    setContacts((prev) => [{ id, ...contact, isFavorite: false }, ...prev]);
    return id;
  }, []);

  const toggleFavorite = useCallback((id) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact))
    );
  }, []);

  const openCreate = useCallback(() => setCreateOpen(true), []);
  const closeCreate = useCallback(() => setCreateOpen(false), []);

  const value = useMemo(() => ({
    contacts,
    isLoading,
    error,
    loadContacts,
    addContact,
    toggleFavorite,
    isCreateOpen,
    openCreate,
    closeCreate,
  }),
  [
      contacts,
      isLoading,
      error,
      loadContacts,
      addContact,
      toggleFavorite,
      isCreateOpen,
      openCreate,
      closeCreate,
    ]
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}
