import React, { useState, useCallback, useMemo } from 'react';
import { fetchContacts, createContact, updateContact, deleteContact } from '../services/contactService';
import { ContactsContext } from './useContacts';

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for A-Z, 'desc' for Z-A

  // Load contacts from API
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

  // Create contact
  const addContact = useCallback(async (contactData) => {
    const newContact = await createContact(contactData);
    setContacts(prev => [newContact, ...prev]);
    return newContact;
  }, []);

  // Update contact (optimistic update - API doesn't support PUT/PATCH)
  const updateContactInContext = useCallback(async (id, contactData) => {
    // Try to update via API, but if it fails (405), update locally only
    try {
      const updated = await updateContact(id, contactData);
      setContacts(prev => prev.map(c => (c.id === id ? updated : c)));
      return updated;
    } catch (error) {
      // If API doesn't support updates (405), update locally
      if (error.message.includes('405')) {
        console.warn('API does not support updates. Updating locally only.');
        const updatedContact = { id, ...contactData };
        setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...updatedContact } : c)));
        return updatedContact;
      }
      throw error;
    }
  }, []);

  // Delete contact
  const removeContact = useCallback(async (id) => {
    await deleteContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback((id) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  }, []);

  // Open/Close create modal
  const openCreate = useCallback(() => setCreateOpen(true), []);
  const closeCreate = useCallback(() => setCreateOpen(false), []);

  // Toggle sort order
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  // Get sorted contacts
  const getSortedContacts = useCallback((contactsList) => {
    return [...contactsList].sort((a, b) => {
      const nameA = (a.fullname || '').toLowerCase();
      const nameB = (b.fullname || '').toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }, [sortOrder]);

  const value = useMemo(() => ({
    contacts,
    isLoading,
    error,
    loadContacts,
    addContact,
    updateContactInContext,
    removeContact,
    toggleFavorite,
    isCreateOpen,
    openCreate,
    closeCreate,
    sortOrder,
    toggleSortOrder,
    getSortedContacts,
  }), [
    contacts,
    isLoading,
    error,
    loadContacts,
    addContact,
    updateContactInContext,
    removeContact,
    toggleFavorite,
    isCreateOpen,
    openCreate,
    closeCreate,
    sortOrder,
    toggleSortOrder,
    getSortedContacts,
  ]);

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}
