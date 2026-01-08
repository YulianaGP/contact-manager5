import { useState, useCallback } from 'react';

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validatorRules - Object with validator functions for each field
 * @returns {Object} - Form state and handlers
 */
export function useFormValidation(initialValues, validatorRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Validate a single field
   */
  const validateField = useCallback((fieldName, value) => {
    if (validatorRules[fieldName]) {
      const error = validatorRules[fieldName](value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
      return !error; // Returns true if valid
    }
    return true;
  }, [validatorRules]);

  /**
   * Validate all fields
   */
  const validateAllFields = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validatorRules).forEach(fieldName => {
      const error = validatorRules[fieldName](values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validatorRules]);

  /**
   * Handle field value change
   */
  const handleChange = useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));

    // Validate on change if field was already touched
    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  }, [touched, validateField]);

  /**
   * Handle field blur (when user leaves the field)
   */
  const handleBlur = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, values[fieldName]);
  }, [values, validateField]);

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  // initialValues should not be in dependencies as it's not expected to change

  /**
   * Set form values programmatically
   */
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  /**
   * Check if form is valid
   */
  const isValid = useCallback(() => {
    return Object.values(errors).every(error => !error);
  }, [errors]);

  /**
   * Check if a specific field has error and was touched
   */
  const getFieldError = useCallback((fieldName) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
  }, [touched, errors]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAllFields,
    isValid,
    resetForm,
    setFormValues,
    getFieldError
  };
}
