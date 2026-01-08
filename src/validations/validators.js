import { errorMessages } from './errorMessages';

/**
 * Validation rules for contact form fields
 */
export const validators = {
  /**
   * Validate full name
   * @param {string} value - The name to validate
   * @returns {string|null} - Error message or null if valid
   */
  fullname: (value) => {
    // Required field
    if (!value || value.trim().length === 0) {
      return errorMessages.nameRequired;
    }

    // Minimum length
    if (value.trim().length < 2) {
      return errorMessages.nameMinLength;
    }

    // Only letters, spaces, and common international characters
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    if (!nameRegex.test(value)) {
      return errorMessages.nameInvalidChars;
    }

    return null; // Valid
  },

  /**
   * Validate email address
   * @param {string} value - The email to validate
   * @returns {string|null} - Error message or null if valid
   */
  email: (value) => {
    // Email is optional, so empty is valid
    if (!value || value.trim().length === 0) {
      return null;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return errorMessages.emailInvalid;
    }

    return null; // Valid
  },

  /**
   * Validate phone number
   * @param {string} value - The phone number to validate
   * @returns {string|null} - Error message or null if valid
   */
  phonenumber: (value) => {
    // Phone is optional, so empty is valid
    if (!value || value.trim().length === 0) {
      return null;
    }

    // Allow numbers, spaces, +, -, (, )
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!phoneRegex.test(value)) {
      return errorMessages.phoneInvalid;
    }

    // Must have at least 6 digits (minimum valid phone length)
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length < 6) {
      return 'Phone number must have at least 6 digits';
    }

    return null; // Valid
  },
};

/**
 * Validate all fields at once
 * @param {Object} values - Object with field values
 * @returns {Object} - Object with error messages for each field
 */
export function validateAllFields(values) {
  const errors = {};

  Object.keys(validators).forEach((field) => {
    const error = validators[field](values[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

/**
 * Check if form has any errors
 * @param {Object} errors - Object with error messages
 * @returns {boolean} - True if no errors
 */
export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
