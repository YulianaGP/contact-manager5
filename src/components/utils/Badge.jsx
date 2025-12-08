import React from 'react';

export default function Badge({ children, color = 'blue', className = '' }) {
  const colors = {
    blue: 'bg-blue-600 text-white',
    slate: 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100',
    gray: 'bg-gray-100 text-gray-800',
  };

  const cls = `inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-semibold rounded-full ${colors[color] || colors.blue} ${className}`.trim();

  return <span className={cls}>{children}</span>;
}
