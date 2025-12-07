// src/components/ContactListPage.jsx
import React from 'react';
import ContactCard from '../components/ContactCard';

export default function ContactListPage() {
  // Ejemplo estático; luego reemplaza por .map(contacts)
  const contacts = [
    { id: 1, name: 'Ana Pérez', phone: '+51 912 345 678', email: 'ana@example.com', isFavorite: false },
    { id: 2, name: 'Luis Gómez', phone: '+51 988 123 456', email: 'luis@example.com', isFavorite: true },
    { id: 3, name: 'María Ruiz', phone: '+51 999 222 333', email: 'maria@example.com', isFavorite: false },
    { id: 4, name: 'Carlos Soto', phone: '+51 977 111 222', email: 'carlos@example.com', isFavorite: true },
    // agrega más para probar scroll...
  ];

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
        {contacts.map((c) => (
          <div key={c.id} className="h-full">
            <ContactCard {...c} />
          </div>
        ))}
      </div>
    </div>
  );
}
