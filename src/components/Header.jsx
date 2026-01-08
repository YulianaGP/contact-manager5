// src/components/Header.jsx
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContacts } from "../context/useContacts";
import { useToast } from "../hooks/useToast";
import { useSearchHistory } from "../hooks/useSearchHistory";
import ContactDetailsModal from "./ContactDetailsModal";
import { exportToJSON, exportToCSV, importFromJSON, importFromCSV } from "./utils/exportImport";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const searchRef = useRef(null);
  const exportMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  const { openCreate, contacts, importContacts } = useContacts();
  const { showToast } = useToast();
  const { history, addToHistory, clearHistory } = useSearchHistory(5);

  // Filter contacts based on search query (searches in name, phone, email)
  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.fullname?.toLowerCase().includes(query) ||
      contact.phonenumber?.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query)
    );
  });

  // Show dropdown if:
  // 1. User is focused and has query (show results)
  // 2. User is focused and has no query but has history (show history)
  const hasQuery = searchQuery.trim().length > 0;
  const shouldShowDropdown = showDropdown && (hasQuery || history.length > 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      addToHistory(searchQuery.trim());
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleHistoryClick = (historyItem) => {
    setSearchQuery(historyItem);
    setShowDropdown(true);
  };

  // Handle export to JSON
  const handleExportJSON = () => {
    if (contacts.length === 0) {
      showToast('No contacts to export', 'warning');
      return;
    }
    exportToJSON(contacts);
    showToast(`${contacts.length} contacts exported to JSON`, 'success');
    setShowExportMenu(false);
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    if (contacts.length === 0) {
      showToast('No contacts to export', 'warning');
      return;
    }
    exportToCSV(contacts);
    showToast(`${contacts.length} contacts exported to CSV`, 'success');
    setShowExportMenu(false);
  };

  // Handle import
  const handleImport = () => {
    fileInputRef.current?.click();
    setShowExportMenu(false);
  };

  // Handle file selection for import
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let importedContacts = [];

      if (file.name.endsWith('.json')) {
        importedContacts = await importFromJSON(file);
      } else if (file.name.endsWith('.csv')) {
        importedContacts = await importFromCSV(file);
      } else {
        showToast('Invalid file type. Please select a .json or .csv file', 'error');
        return;
      }

      importContacts(importedContacts);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      // Reset file input
      e.target.value = '';
    }
  };

  // Close export menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    }
    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showExportMenu]);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/contacts", label: "Contacts" },
    // Keep the entry for mapping but mark special action
    { to: "/contacts/new", label: "Add contact", primary: true, action: openCreate },
  ];

  return (
    <>
      <header
        className="w-full bg-white text-slate-900 dark:bg-gray-900 dark:text-gray-100 shadow-sm"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo / Title */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                aria-label="Go to home - Contact Manager"
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg
                             bg-blue-600 text-white font-semibold text-lg
                             ring-0 group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                >
                  📞
                </span>

                <span className="hidden sm:inline-block">
                  <span className="text-lg font-semibold leading-tight">Contact Manager</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 -mt-0.5">My important contacts</span>
                </span>
              </Link>
            </div>

            {/* Center: Search (visible md+) */}
            <div className="hidden md:flex md:flex-1 md:justify-center" ref={searchRef}>
              <div className="relative w-full max-w-md">
                <label className="relative w-full block">
                  <input
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search for contacts..."
                    className="
                      peer w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                      bg-white text-sm placeholder:text-gray-400
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                      focus:border-transparent
                      dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-100
                      transition-colors
                    "
                    aria-label="Search contacts"
                  />
                  <span
                    className="
                      absolute left-3 top-1/2 -translate-y-1/2 text-gray-400
                      peer-focus:text-blue-600 dark:peer-focus:text-blue-400
                    "
                    aria-hidden="true"
                  >
                    🔎
                  </span>
                </label>

                {/* Search Dropdown */}
                {shouldShowDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {/* Show search results if there's a query */}
                    {hasQuery ? (
                      filteredContacts.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                          No contacts found
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                          {filteredContacts.map(contact => (
                            <li key={contact.id}>
                              <button
                                onClick={() => handleContactClick(contact)}
                                className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors flex items-center gap-3"
                              >
                                {/* Avatar */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
                                  {contact.fullname?.split(" ").map(n => n[0]).filter(Boolean).slice(0, 2).join("")}
                                </div>

                                {/* Contact Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                      {contact.fullname}
                                    </p>
                                    {contact.isFavorite && (
                                      <span className="text-yellow-500">⭐</span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {contact.phonenumber} • {contact.email}
                                  </p>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )
                    ) : (
                      /* Show search history if no query */
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Recent Searches
                        </div>
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                          {history.map((item, index) => (
                            <li key={index}>
                              <button
                                onClick={() => handleHistoryClick(item)}
                                className="w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors flex items-center gap-3"
                              >
                                <span className="text-gray-400">🕐</span>
                                <span className="text-sm text-gray-700 dark:text-gray-200">{item}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                        {history.length > 0 && (
                          <>
                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                            <button
                              onClick={clearHistory}
                              className="w-full px-4 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-center"
                            >
                              Clear history
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right: nav / actions */}
            <div className="flex items-center gap-3">
              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-2" aria-label="Main" role="navigation">
                {navItems.map((item) => {
                  // If the item defines an `action`, render a button that triggers it instead of a NavLink
                  if (item.action) {
                    return (
                      <button
                        key={item.to}
                        type="button"
                        onClick={item.action}
                        className={[
                          "px-3 py-2 rounded-md text-sm font-medium transition",
                          item.primary
                            ? "inline-flex items-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
                            : "text-slate-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                        ].join(" ")}
                      >
                        {item.label}
                      </button>
                    );
                  }

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        [
                          "px-3 py-2 rounded-md text-sm font-medium transition",
                          item.primary
                            ? "inline-flex items-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
                            : "text-slate-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                          isActive ? "ring-2 ring-blue-300 dark:ring-blue-500" : "",
                        ].join(" ")
                      }
                      aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Export/Import Menu */}
              <div className="relative" ref={exportMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition"
                  aria-label="Export/Import menu"
                  aria-expanded={showExportMenu}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
                    <button
                      onClick={handleExportJSON}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <span>📥</span>
                      <span>Export to JSON</span>
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <span>📊</span>
                      <span>Export to CSV</span>
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleImport}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                    >
                      <span>📤</span>
                      <span>Import contacts</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Hidden file input for import */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Import contacts file"
              />

              {/* Profile / Avatar button (example) */}
              <button
                type="button"
                className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition"
                aria-label="Open profile"
              >
                Y
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-200 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:hidden transition"
              >
                <span className="sr-only">Open menu</span>
                {/* icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu (collapsible) */}
        <div
          id="mobile-menu"
          className={`md:hidden border-t border-slate-100 dark:border-slate-800 transition-max-h duration-200 overflow-hidden ${
            open ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            <ul role="list" className="space-y-1">
              {navItems.map((item, idx) => {
                // If the item has an action, use button
                if (item.action) {
                  return (
                    <li
                      key={item.to}
                      className={`
                        rounded-md px-2 py-2
                        ${idx % 2 === 0 ? "bg-white/30 dark:bg-white/5" : ""}
                      `}
                    >
                      <button
                        onClick={() => {
                          item.action();
                          setOpen(false);
                        }}
                        className={[
                          "block w-full text-left px-2 py-1 rounded-md transition",
                          item.primary
                            ? "bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
                        ].join(" ")}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.to}
                    className={`
                      rounded-md px-2 py-2
                      ${idx % 2 === 0 ? "bg-white/30 dark:bg-white/5" : ""}
                    `}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          "block w-full text-left px-2 py-1 rounded-md transition",
                          item.primary
                            ? "bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
                          isActive ? "ring-1 ring-indigo-300 dark:ring-indigo-500" : "",
                        ].join(" ")
                      }
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                onClick={() => {
                  // Example action for logout or go to profile
                  setOpen(false);
                }}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Details Modal */}
      {selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </>
  );
}
