import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { fetchContacts, createContact, updateContact, deleteContact } from '../services/contactService';
import { ContactsContext } from './useContacts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../hooks/useToast';

export function ContactsProvider({ children }) {
  const { showToast } = useToast();
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'asc'); // 'asc' for A-Z, 'desc' for Z-A

  // Load contacts from API and merge with local favorites
  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiContacts = await fetchContacts();

      console.log('🔍 DEBUG - API Contacts (after transform):', apiContacts.slice(0, 2));
      console.log('🔍 DEBUG - First contact group:', apiContacts[0]?.group, 'type:', apiContacts[0]?.type);

      // Merge API data with local favorites
      const mergedContacts = apiContacts.map(apiContact => {
        const localContact = contacts.find(c => c.id === apiContact.id);
        const merged = {
          ...apiContact,
          // Preserve local favorite status
          isFavorite: localContact?.isFavorite || apiContact.isFavorite || false
        };
        return merged;
      });

      console.log('🔍 DEBUG - Merged Contacts:', mergedContacts.slice(0, 2));
      console.log('🔍 DEBUG - First merged contact group:', mergedContacts[0]?.group, 'type:', mergedContacts[0]?.type);

      setContacts(mergedContacts);
    } catch (err) {
      setError(err.message);
      // If API fails and we have cached data, keep using it
      if (contacts.length > 0) {
        console.warn('API failed, using cached contacts from localStorage');
      }
    } finally {
      setIsLoading(false);
    }
  }, [contacts, setContacts]);

  // Create contact
  const addContact = useCallback(async (contactData) => {
    try {
      const newContact = await createContact(contactData);
      setContacts(prev => [newContact, ...prev]);
      showToast('Contact created successfully!', 'success');
      return newContact;
    } catch (error) {
      showToast(`Error creating contact: ${error.message}`, 'error');
      throw error;
    }
  }, [setContacts, showToast]);

  // Update contact (optimistic update - API doesn't support PUT/PATCH)
  const updateContactInContext = useCallback(async (id, contactData) => {
    // Try to update via API, but if it fails (405), update locally only
    try {
      const updated = await updateContact(id, contactData);
      setContacts(prev => prev.map(c => (c.id === id ? updated : c)));
      showToast('Contact updated successfully!', 'success');
      return updated;
    } catch (error) {
      // If API doesn't support updates (405), update locally
      if (error.message.includes('405')) {
        console.warn('API does not support updates. Updating locally only.');
        const updatedContact = { id, ...contactData };
        setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...updatedContact } : c)));
        showToast('Contact updated locally (API unavailable)', 'warning');
        return updatedContact;
      }
      showToast(`Error updating contact: ${error.message}`, 'error');
      throw error;
    }
  }, [setContacts, showToast]);

  // Delete contact
  const removeContact = useCallback(async (id) => {
    try {
      await deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      showToast('Contact deleted successfully!', 'success');
    } catch (error) {
      showToast(`Error deleting contact: ${error.message}`, 'error');
      throw error;
    }
  }, [setContacts, showToast]);

  // Import contacts from file
  const importContacts = useCallback((importedContacts) => {
    try {
      let addedCount = 0;
      let skippedCount = 0;

      const updatedContacts = [...contacts];

      importedContacts.forEach(imported => {
        // Check for duplicates (case-insensitive name comparison)
        const exists = contacts.find(c =>
          c.fullname.toLowerCase() === imported.fullname.toLowerCase()
        );

        if (!exists) {
          // Generate unique ID for new contact
          const newContact = {
            ...imported,
            id: Date.now() + Math.random()
          };
          updatedContacts.push(newContact);
          addedCount++;
        } else {
          skippedCount++;
        }
      });

      setContacts(updatedContacts);

      // Show appropriate toast message
      if (addedCount > 0 && skippedCount === 0) {
        showToast(`${addedCount} contact${addedCount > 1 ? 's' : ''} imported successfully!`, 'success');
      } else if (addedCount > 0 && skippedCount > 0) {
        showToast(`${addedCount} imported, ${skippedCount} skipped (duplicates)`, 'info');
      } else if (skippedCount > 0) {
        showToast(`All contacts already exist (${skippedCount} duplicates)`, 'warning');
      }

      return { addedCount, skippedCount };
    } catch (error) {
      showToast(`Error importing contacts: ${error.message}`, 'error');
      throw error;
    }
  }, [contacts, setContacts, showToast]);

  // Toggle favorite
  const toggleFavorite = useCallback((id) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  }, [setContacts]);

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
    importContacts,
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
    importContacts,
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
