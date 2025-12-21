import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ContactsContext = createContext(null);

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([
    { id: 1, fullname: 'Ana Pérez', phonenumber: '+51 912 345 678', email: 'ana@example.com', isFavorite: false, group: 'Family' },
    { id: 2, fullname: 'Luis Gómez', phonenumber: '+51 988 123 456', email: 'luis@example.com', isFavorite: false, group: 'Work' },
    { id: 3, fullname: 'María Ruiz', phonenumber: '+51 999 222 333', email: 'maria@example.com', isFavorite: false, group: 'Friends' },
    { id: 4, fullname: 'Carlos Soto', phonenumber: '+51 977 111 222', email: 'carlos@example.com', isFavorite: false, group: 'Client' },
  ]);

  const [isCreateOpen, setCreateOpen] = useState(false);

  const addContact = useCallback((contact) => {
    console.log("🔥 ADD CONTACT CALLED WITH:", contact);
    console.log("🚨 KEYS:", Object.keys(contact));
    debugger;
    
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
