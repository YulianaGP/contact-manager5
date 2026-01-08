import { useMemo } from 'react';
import { useContacts } from '../../context/useContacts';

export default function DashboardPage() {
  const { contacts } = useContacts();

  // Calculate statistics using useMemo for performance
  const stats = useMemo(() => {
    const total = contacts.length;
    const favorites = contacts.filter(c => c.isFavorite).length;

    // Count contacts by group
    const byGroup = contacts.reduce((acc, contact) => {
      const group = contact.group || 'None';
      acc[group] = (acc[group] || 0) + 1;
      return acc;
    }, {});

    // Count contacts with email and phone
    const withEmail = contacts.filter(c => c.email && c.email.trim()).length;
    const withPhone = contacts.filter(c => c.phonenumber && c.phonenumber.trim()).length;

    // Calculate percentages
    const emailPercentage = total > 0 ? Math.round((withEmail / total) * 100) : 0;
    const phonePercentage = total > 0 ? Math.round((withPhone / total) * 100) : 0;

    return {
      total,
      favorites,
      byGroup,
      withEmail,
      withPhone,
      emailPercentage,
      phonePercentage,
      uniqueGroups: Object.keys(byGroup).length
    };
  }, [contacts]);

  // Group colors (matching groupColors.js)
  const groupColors = {
    'Work': 'bg-blue-500',
    'Friends': 'bg-green-500',
    'Family': 'bg-purple-500',
    'Client': 'bg-orange-500',
    'None': 'bg-gray-400'
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <span>📊</span>
          <span>Dashboard</span>
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Overview of your contacts and statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Contacts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Favorites</p>
              <p className="text-4xl font-bold text-yellow-500 mt-2">{stats.favorites}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Groups</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.uniqueGroups}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts by Group */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Contacts by Group
        </h2>

        {stats.total === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No contacts yet. Add some to see statistics!
          </p>
        ) : (
          <div className="space-y-4">
            {Object.entries(stats.byGroup)
              .sort(([, a], [, b]) => b - a) // Sort by count descending
              .map(([group, count]) => {
                const percentage = Math.round((count / stats.total) * 100);
                const colorClass = groupColors[group] || 'bg-gray-400';

                return (
                  <div key={group} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{group}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${colorClass} h-full rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Contact Information Completeness */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Contact Information
        </h2>

        {stats.total === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No data to display
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>📧</span>
                  <span>Contacts with Email</span>
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {stats.withEmail} / {stats.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${stats.emailPercentage}%` }}
                >
                  {stats.emailPercentage > 20 && (
                    <span className="text-xs font-bold text-white">{stats.emailPercentage}%</span>
                  )}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>📱</span>
                  <span>Contacts with Phone</span>
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {stats.withPhone} / {stats.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${stats.phonePercentage}%` }}
                >
                  {stats.phonePercentage > 20 && (
                    <span className="text-xs font-bold text-white">{stats.phonePercentage}%</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
