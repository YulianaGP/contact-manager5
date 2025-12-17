import React, { useState } from 'react';
import { useContacts } from '../context/ContactsContext';

export default function ContactModal() {
  const { isCreateOpen, addContact, closeCreate } = useContacts();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('None');

  if (!isCreateOpen) return null;

  function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) return;
    addContact({ name: name.trim(), phone: phone.trim(), email: email.trim(), group });
    setName('');
    setPhone('');
    setEmail('');
    closeCreate();
    setGroup('None');
  }

  const inputCls =
    'w-full mt-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={closeCreate} />

      <form
        onSubmit={handleSave}
        aria-label="Create contact"
        className="relative z-10 w-full max-w-md bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg transition-transform"
      >
        <button
          type="button"
          onClick={closeCreate}
          aria-label="Close"
          className="absolute right-3 top-3 text-slate-700 dark:text-slate-200 hover:opacity-80"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">New contact</h3>

        <label className="block">
          <span className="text-sm text-slate-700 dark:text-slate-200">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} required />
        </label>

        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Phone</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
        </label>

        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputCls} />
        </label>

        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Group</span>

          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className={inputCls}
          >
            <option value="None">None</option>
            <option value="Family">Family</option>
            <option value="Work">Work</option>
            <option value="Friends">Friends</option>
            <option value="Client">Client</option>
          </select>
        </label>

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={closeCreate} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-sm">
            Cancel
          </button>

          <button type="submit" className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
