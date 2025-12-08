import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ContactsContext = createContext(null);

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Ana Pérez', phone: '+51 912 345 678', email: 'ana@example.com', isFavorite: false },
    { id: 2, name: 'Luis Gómez', phone: '+51 988 123 456', email: 'luis@example.com', isFavorite: false },
    { id: 3, name: 'María Ruiz', phone: '+51 999 222 333', email: 'maria@example.com', isFavorite: false },
    { id: 4, name: 'Carlos Soto', phone: '+51 977 111 222', email: 'carlos@example.com', isFavorite: false },
  ]);

  const [isCreateOpen, setCreateOpen] = useState(false);

  const addContact = useCallback((contact) => {
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
    addContact,
    toggleFavorite,
    isCreateOpen,
    openCreate,
    closeCreate,
  }), [contacts, addContact, toggleFavorite, isCreateOpen, openCreate, closeCreate]);

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}
