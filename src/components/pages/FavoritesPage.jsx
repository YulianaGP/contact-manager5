import React from 'react';
import ContactCard from '../ContactCard';
import { useContacts } from '../../context/ContactsContext';

export default function FavoritesPage() {
  const { contacts, toggleFavorite } = useContacts();

  // Filter only favorite contacts
  const favoriteContacts = contacts.filter((contact) => contact.isFavorite);

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Favorite Contacts
        </h2>
      </div>

      {favoriteContacts.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
          No favorite contacts yet. Mark some contacts as favorites to see them here.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {favoriteContacts.map((contact) => (
            <div key={contact.id} className="h-full">
              <ContactCard
                {...contact}
                onToggleFavorite={() => toggleFavorite(contact.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
