import React from 'react';

export default function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  ...rest
}) {
  const base = 'w-full mt-1 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';
  const cls = `${base} ${className}`.trim();

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={cls}
      {...rest}
    />
  );
}
