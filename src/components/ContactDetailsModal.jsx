import React from 'react';
import { GROUP_COLORS } from './utils/groupColors';

export default function ContactDetailsModal({ contact, onClose }) {
  if (!contact) return null;

  const colorClasses = GROUP_COLORS[contact.group] ?? 'bg-white dark:bg-slate-900';

  const initials = (contact.fullname || "")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-700 dark:text-slate-200 hover:opacity-80 text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar */}
          <div
            className={`
              shrink-0 w-20 h-20 rounded-full bg-indigo-600 text-white
              flex items-center justify-center font-semibold text-2xl
            `}
          >
            {initials}
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {contact.fullname}
            </h3>
            {contact.isFavorite && (
              <span className="inline-flex items-center gap-1 px-2 py-1 mt-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                ⭐ Favorite
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone Number</label>
            <p className="mt-1 text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>📱</span>
              {contact.phonenumber || 'Not provided'}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</label>
            <p className="mt-1 text-base text-slate-900 dark:text-slate-100 flex items-center gap-2 break-all">
              <span>✉️</span>
              {contact.email || 'Not provided'}
            </p>
          </div>

          {/* Group */}
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Group</label>
            <p className="mt-1">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClasses}`}>
                {contact.group || 'None'}
              </span>
            </p>
          </div>

          {/* ID (for debugging) */}
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Contact ID</label>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 font-mono">
              #{contact.id}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
