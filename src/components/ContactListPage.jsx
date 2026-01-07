// src/components/ContactListPage.jsx
import { useState } from 'react';
import ContactCard from './ContactCard';
import ContactEditForm from './ContactEditForm';
import ContactDetailsModal from './ContactDetailsModal';
import { useContacts } from '../context/useContacts';

export default function ContactListPage() {
  const {
    contacts,
    isLoading,
    error,
    loadContacts,
    toggleFavorite,
    removeContact,
    sortOrder,
    toggleSortOrder,
    getSortedContacts,
  } = useContacts();

  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);

  // Get sorted contacts
  const sortedContacts = getSortedContacts(contacts);

  return (
    <div className="flex-1 p-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          My Contacts
        </h2>

        <div className="flex items-center gap-3">
          {/* Sort Filter - Only visible when contacts are loaded */}
          {!isLoading && contacts.length > 0 && (
            <button
              onClick={toggleSortOrder}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition flex items-center gap-2"
              aria-label={`Sort ${sortOrder === 'asc' ? 'A-Z' : 'Z-A'}`}
            >
              <span>Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sortOrder === 'asc' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                )}
              </svg>
            </button>
          )}

          <button
            onClick={loadContacts}
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mb-4 text-center text-slate-600 dark:text-slate-300">
          Loading contacts from API...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded text-center">
          <p>{error}</p>
          <button
            onClick={loadContacts}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && contacts.length === 0 && (
        <div className="text-center text-slate-500 dark:text-slate-400 mt-6">
          No contacts loaded. Click <strong>Load</strong> to fetch contacts.
        </div>
      )}

      {/* Grid */}
      {!isLoading && !error && contacts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {sortedContacts.map((contact) => (
            <div key={contact.id} className="h-full">
              <ContactCard
                fullname={contact.fullname}
                phonenumber={contact.phonenumber}
                email={contact.email}
                group={contact.group ?? 'none'}
                isFavorite={contact.isFavorite}
                onToggleFavorite={() => toggleFavorite(contact.id)}
                onEdit={() => setEditingContact(contact)}
                onDelete={() => {
                  if (window.confirm(`Are you sure you want to delete ${contact.fullname}?`)) {
                    removeContact(contact.id);
                  }
                }}
                onDetails={() => setViewingContact(contact)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingContact && (
        <ContactEditForm
          contact={editingContact}
          onClose={() => setEditingContact(null)}
        />
      )}

      {/* Details Modal */}
      {viewingContact && (
        <ContactDetailsModal
          contact={viewingContact}
          onClose={() => setViewingContact(null)}
        />
      )}
    </div>
  );
}
