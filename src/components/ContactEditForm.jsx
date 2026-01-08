import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/useContacts';
import { useFormValidation } from '../hooks/useFormValidation';
import { validators } from '../validations/validators';

export default function ContactEditForm({ contact, onClose }) {
  const { updateContactInContext } = useContacts();
  const [isSaving, setIsSaving] = useState(false);

  // Form validation hook
  const {
    values,
    handleChange,
    handleBlur,
    validateAllFields,
    setFormValues,
    getFieldError
  } = useFormValidation(
    {
      fullname: '',
      phonenumber: '',
      email: '',
      group: 'None'
    },
    validators
  );

  // Load contact data when contact changes
  useEffect(() => {
    if (contact) {
      setFormValues({
        fullname: contact.fullname || '',
        phonenumber: contact.phonenumber || '',
        email: contact.email || '',
        group: contact.group || 'None'
      });
    }
  }, [contact, setFormValues]);

  async function handleSave(e) {
    e.preventDefault();

    // Validate all fields before submitting
    if (!validateAllFields()) {
      return;
    }

    setIsSaving(true);
    try {
      await updateContactInContext(contact.id, values);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  if (!contact) return null;

  const inputCls = 'w-full mt-2 px-3 py-2 rounded-md border bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const getInputClass = (fieldName) => {
    const error = getFieldError(fieldName);
    return `${inputCls} ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700'}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={handleSave} className="relative z-10 w-full max-w-md bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-700 dark:text-slate-200 hover:opacity-80 text-2xl"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Edit Contact</h3>

        {/* Name Field */}
        <label className="block">
          <span className="text-sm text-slate-700 dark:text-slate-200">Name *</span>
          <input
            value={values.fullname}
            onChange={e => handleChange('fullname', e.target.value)}
            onBlur={() => handleBlur('fullname')}
            className={getInputClass('fullname')}
          />
          {getFieldError('fullname') && (
            <p className="mt-1 text-sm text-red-500">{getFieldError('fullname')}</p>
          )}
        </label>

        {/* Phone Field */}
        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Phone</span>
          <input
            value={values.phonenumber}
            onChange={e => handleChange('phonenumber', e.target.value)}
            onBlur={() => handleBlur('phonenumber')}
            className={getInputClass('phonenumber')}
          />
          {getFieldError('phonenumber') && (
            <p className="mt-1 text-sm text-red-500">{getFieldError('phonenumber')}</p>
          )}
        </label>

        {/* Email Field */}
        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Email</span>
          <input
            value={values.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            type="email"
            className={getInputClass('email')}
          />
          {getFieldError('email') && (
            <p className="mt-1 text-sm text-red-500">{getFieldError('email')}</p>
          )}
        </label>

        {/* Group Field */}
        <label className="block mt-3">
          <span className="text-sm text-slate-700 dark:text-slate-200">Group</span>
          <select
            value={values.group}
            onChange={e => handleChange('group', e.target.value)}
            className={inputCls}
          >
            <option value="None">None</option>
            <option value="Family">Family</option>
            <option value="Work">Work</option>
            <option value="Friends">Friends</option>
            <option value="Client">Client</option>
          </select>
        </label>

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-sm hover:bg-slate-200 dark:hover:bg-slate-600">Cancel</button>
          <button type="submit" disabled={isSaving} className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
