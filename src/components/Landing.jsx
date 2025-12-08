// src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'; // si no quieres la imagen, borra esta línea

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">

      <div className="text-center max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg transition-colors duration-300">

        <h1 className="text-4xl font-bold mb-3 text-slate-900 dark:text-slate-100 border-b pb-2 border-slate-300 dark:border-slate-700">
          Contact Manager
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
          Welcome — manage your important contacts
        </p>

        {/* React link */}
        <a href="https://react.dev" target="_blank" rel="noreferrer" className="block w-full mb-6">
          <img src={reactLogo} alt="React logo" className="w-20 mx-auto animate-spin-slow" />
        </a>

        <button
          onClick={() => navigate('/contacts')}
          className="w-full px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          Get started
        </button>

      </div>
    </div>
  );
}
