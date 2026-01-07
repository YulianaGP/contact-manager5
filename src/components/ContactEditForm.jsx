import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/useContacts';

export default function ContactEditForm({ contact, onClose }) {
  const { updateContactInContext } = useContacts();

  const [fullname, setFullname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('None');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (contact) {
      setFullname(contact.fullname);
      setPhonenumber(contact.phonenumber);
      setEmail(contact.email);
      setGroup(contact.group || 'None');
    }
  }, [contact]);

  async function handleSave(e) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateContactInContext(contact.id, { fullname, phonenumber, email, group });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  if (!contact) return null;

  const inputCls = 'w-full mt-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={handleSave} className="relative z-10 w-full max-w-md bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-700 dark:text-slate-200 hover:opacity-80 text-2xl"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Edit Contact</h3>

        <label className="block">
          <span className="text-sm text-slate-700 dark:text-slate-200">Name</span>
          <input value={fullname} onChange={e => setFullname(e.target.value)} className={inputCls} required />
        </label>

        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Phone</span>
          <input value={phonenumber} onChange={e => setPhonenumber(e.target.value)} className={inputCls} />
        </label>

        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Email</span>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className={inputCls} />
        </label>

        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Group</span>
          <select value={group} onChange={e => setGroup(e.target.value)} className={inputCls}>
            <option value="None">None</option>
            <option value="Family">Family</option>
            <option value="Work">Work</option>
            <option value="Friends">Friends</option>
            <option value="Client">Client</option>
          </select>
        </label>

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-sm">Cancel</button>
          <button type="submit" disabled={isSaving} className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm">{isSaving ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
