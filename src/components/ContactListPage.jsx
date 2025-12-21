// src/components/ContactListPage.jsx
import React from 'react';
import ContactCard from './ContactCard';
import { useContacts } from '../context/ContactsContext';

export default function ContactListPage() {
  // Use contacts from context
  const { contacts, toggleFavorite } = useContacts();
  
  console.log("CONTACTS FROM CONTEXT:", contacts);

  return (
    // flex-1 para tomar el espacio disponible del Layout; overflow-auto para scroll interno
    <div className="flex-1 p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          My Contacts
        </h2>
      </div>

      {/* Grid responsiva: cada celda tiene la misma altura (auto-rows-fr)
          y las tarjetas con h-full se estiran dentro de su celda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {contacts.map((contact) => (

          <div key={contact.id} className="h-full">
            <ContactCard
              fullname={contact.fullname}
              phonenumber={contact.phonenumber}
              email={contact.email}
              group={contact.group ?? "none"}
              isFavorite={contact.isFavorite}
              onToggleFavorite={() => toggleFavorite(contact.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
