/**
 * Centralized error messages for form validation
 */
export const errorMessages = {
  // Name validation
  nameRequired: 'Name is required',
  nameMinLength: 'Name must be at least 2 characters',
  nameInvalidChars: 'Name can only contain letters and spaces',

  // Email validation
  emailInvalid: 'Please enter a valid email address',
  emailFormat: 'Email format: example@domain.com',

  // Phone validation
  phoneInvalid: 'Please enter a valid phone number',
  phoneFormat: 'Phone can only contain numbers, spaces, +, -, (, )',

  // General
  fieldRequired: 'This field is required',
};
