// src/components/Header.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/contacts", label: "Contacts" },
    { to: "/contacts/new", label: "Add contact", primary: true },
  ];

  return (
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
              aria-label="Ir al inicio - Contact Manager"
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
                <span className="text-lg font-semibold leading-tight">
                  Contact Manager
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                  My important contacts
                </span>
              </span>
            </Link>
          </div>

          {/* Center: Search (visible md+) — example of peer/peer-focus */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <label className="relative w-full max-w-md">
              <input
                type="search"
                name="search"
                placeholder="Search for contacts..."
                className="
                  peer w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200
                  bg-white text-sm placeholder:text-gray-400
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                  focus:border-transparent
                  dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500
                  transition-colors
                "
                aria-label="Buscar contactos"
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
          </div>

          {/* Right: nav / actions */}
          <div className="flex items-center gap-3">
            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-2"
              aria-label="Principal"
              role="navigation"
            >
              {navItems.map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "px-3 py-2 rounded-md text-sm font-medium transition",
                      // primary button style
                      item.primary
                        ? "inline-flex items-center gap-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
                        : "text-slate-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                      // active state
                      isActive ? "ring-2 ring-blue-300 dark:ring-blue-500" : "",
                    ].join(" ")
                  }
                  aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Profile / Avatar button (example) */}
            <button
              type="button"
              className="
                hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full
                bg-gray-100 dark:bg-gray-800 text-sm font-medium text-slate-800 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-gray-700
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400
                transition
              "
              aria-label="Abrir perfil"
            >
              Y
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="
                inline-flex items-center justify-center p-2 rounded-md
                text-slate-700 dark:text-gray-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                md:hidden
                transition
              "
            >
              <span className="sr-only">Abrir menú</span>
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
        className={`md:hidden border-t border-gray-100 dark:border-gray-800 transition-max-h duration-200 overflow-hidden ${
          open ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          <ul role="list" className="space-y-1">
            {navItems.map((item, idx) => (
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
                        ? "bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        : "text-slate-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                      isActive ? "ring-1 ring-blue-300 dark:ring-blue-500" : "",
                    ].join(" ")
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              onClick={() => {
                // ejemplo de acción de logout o ir a perfil
                setOpen(false);
              }}
            >
              Perfil
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
