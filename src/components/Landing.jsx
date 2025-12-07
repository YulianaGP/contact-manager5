// src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'; // si no quieres la imagen, borra esta línea

export default function Landing() {
  const navigate = useNavigate();

  return (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 
                  bg-gray-100 text-gray-800 
                  dark:bg-gray-900 dark:text-gray-100">

    <div className="text-center max-w-md w-full 
                    bg-white dark:bg-gray-800 
                    p-8 rounded-xl shadow-lg 
                    transition-colors duration-300">

      <h1 className="text-4xl font-bold mb-3 
                     text-gray-800 dark:text-gray-100 
                     border-b pb-2 border-gray-300 dark:border-gray-700">
        Contact Manager
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Welcome — manage your important contacts
      </p>

      {/* React link */}
      <a
        href="https://react.dev"
        target="_blank"
        rel="noreferrer"
        className="block w-full mb-6"
      >
        <img
          src={reactLogo}
          alt="React logo"
          className="w-20 mx-auto animate-spin-slow"
        />
      </a>

      {/* Botón mejorado */}
      <button
        onClick={() => navigate('/contacts')}
        className="
          w-full px-6 py-3 
          bg-blue-600 dark:bg-blue-500 
          text-white font-semibold 
          rounded-lg shadow-md 
          hover:bg-blue-700 dark:hover:bg-blue-400 
          hover:shadow-lg 
          active:scale-[0.98]
          transition-all duration-200
        "
      >
        Ingresar aquí
      </button>

    </div>
  </div>
);
}
