import { useState } from 'react';
import { useContacts } from '../../context/useContacts';
import { GROUP_COLORS } from '../utils/groupColors';

export default function GroupsPage() {
  const { contacts, sortOrder, toggleSortOrder, getSortedContacts } = useContacts();

  // State to control which groups are expanded
  const [expandedGroups, setExpandedGroups] = useState({
    Work: true,
    Friends: true,
    Family: true,
    Client: true,
    None: true,
  });

  // Group contacts by group
  const groupedContacts = {
    Work: getSortedContacts(contacts.filter(c => c.group === 'Work')),
    Friends: getSortedContacts(contacts.filter(c => c.group === 'Friends')),
    Family: getSortedContacts(contacts.filter(c => c.group === 'Family')),
    Client: getSortedContacts(contacts.filter(c => c.group === 'Client')),
    None: getSortedContacts(contacts.filter(c => c.group === 'None' || !c.group)),
  };

  // Toggle expand/collapse group
  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Simple contact card component (read-only)
  const SimpleContactCard = ({ contact }) => {
    const initials = (contact.fullname || "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("");

    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
                {contact.fullname}
              </h3>
              {contact.isFavorite && (
                <span className="text-yellow-500" title="Favorite">⭐</span>
              )}
            </div>

            <div className="space-y-0.5 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-1.5 truncate">
                <span>📱</span>
                <span className="truncate">{contact.phonenumber}</span>
              </p>
              <p className="flex items-center gap-1.5 truncate">
                <span>✉️</span>
                <span className="truncate">{contact.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Group section component
  const GroupSection = ({ groupName, contacts, colorClasses }) => {
    const isExpanded = expandedGroups[groupName];
    const count = contacts.length;

    return (
      <div className="mb-4">
        {/* Group header */}
        <button
          onClick={() => toggleGroup(groupName)}
          className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${colorClasses} hover:opacity-80`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">{groupName}</span>
            <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 bg-white/80 dark:bg-slate-800/80 rounded-full text-xs font-semibold">
              {count}
            </span>
          </div>
          <span className="text-xl">{isExpanded ? '▼' : '▶'}</span>
        </button>

        {/* Contact list */}
        {isExpanded && (
          <div className="mt-3 space-y-2 pl-2">
            {count === 0 ? (
              <p className="text-center text-slate-500 dark:text-slate-400 py-4 text-sm">
                No contacts in this group
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {contacts.map(contact => (
                  <SimpleContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Contacts by Groups
          </h2>

          {/* Sort Filter - Only visible when there are contacts */}
          {contacts.length > 0 && (
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
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          View your contacts organized by groups
        </p>
      </div>

      {contacts.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
          No contacts available. Load contacts to see them grouped.
        </p>
      ) : (
        <div className="space-y-3">
          <GroupSection
            groupName="Work"
            contacts={groupedContacts.Work}
            colorClasses={GROUP_COLORS.Work}
          />
          <GroupSection
            groupName="Friends"
            contacts={groupedContacts.Friends}
            colorClasses={GROUP_COLORS.Friends}
          />
          <GroupSection
            groupName="Family"
            contacts={groupedContacts.Family}
            colorClasses={GROUP_COLORS.Family}
          />
          <GroupSection
            groupName="Client"
            contacts={groupedContacts.Client}
            colorClasses={GROUP_COLORS.Client}
          />
          <GroupSection
            groupName="None"
            contacts={groupedContacts.None}
            colorClasses="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
          />
        </div>
      )}
    </div>
  );
}
