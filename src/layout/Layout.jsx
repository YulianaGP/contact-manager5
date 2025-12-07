// src/layout/Layout.jsx
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = [
    { to: '/contacts', label: 'All' },
    { to: '/favorites', label: 'Favorites' },
    { to: '/groups', label: 'Groups' },
    { to: '/settings', label: 'Settings' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-slate-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />

      {/* Content wrapper - flex-1 para que ocupe el espacio restante */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 w-full p-4 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-fit" aria-label="Sidebar">
          <nav className="space-y-1 text-sm" role="navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   ${isActive ? 'bg-blue-50 dark:bg-blue-900/40 ring-1 ring-blue-200 dark:ring-blue-500' : 'text-slate-700 dark:text-gray-200'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            
          </nav>
        </aside>

        {/* Main area */}
        <main className="w-full flex flex-col">
          {/* Mobile: simple toggle + CTA */}
          <div className="md:hidden mb-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              aria-expanded={sidebarOpen}
              aria-controls="mobile-sidebar"
              className="px-3 py-2 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {sidebarOpen ? 'Cerrar' : 'Menú'}
            </button>

            
          </div>

          {/* Mobile sidebar (collapsible) */}
          {sidebarOpen && (
            <div id="mobile-sidebar" className="md:hidden mb-4 bg-white dark:bg-gray-800 rounded-lg shadow p-3">
              <nav className="space-y-1">
                {navItems.map((item, idx) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}

          {/* Outlet (rutas hijas) */}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Portal root para modales/toasts */}
      <div id="portal-root" aria-hidden="true" />
    </div>
  );
}
