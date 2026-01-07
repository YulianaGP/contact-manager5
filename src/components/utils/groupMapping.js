/**
 * Mapeo de valores de la API al formato de la aplicación
 *
 * API usa 'type' con valores en español: familia, trabajo, social, personal, amistad
 * App usa 'group' con valores en inglés: Family, Work, Friends, None, Client
 */

// API → App (cuando se reciben datos de la API)
export const API_TO_APP_GROUP = {
  'familia': 'Family',    // familia → Family
  'trabajo': 'Work',      // trabajo → Work
  'social': 'Friends',    // social → Friends
  'personal': 'None',     // personal → None
  'amistad': 'Friends',   // amistad → Friends
};

// App → API (cuando se envían datos a la API)
export const APP_TO_API_TYPE = {
  'Family': 'familia',
  'Work': 'trabajo',
  'Friends': 'social',
  'None': 'personal',
  'Client': 'trabajo',  // Client se mapea a trabajo
};

/**
 * Transforma un contacto de la API al formato de la aplicación
 * Convierte el campo 'type' (español) a 'group' (inglés)
 *
 * @param {Object} apiContact - Contacto con formato de API (usa 'type')
 * @returns {Object} Contacto con formato de App (usa 'group')
 *
 * @example
 * // Input de la API:
 * { id: 1, fullname: "Juan", type: "familia" }
 * // Output para la App:
 * { id: 1, fullname: "Juan", group: "Family", type: "familia" }
 */
export function transformContactFromAPI(apiContact) {
  return {
    ...apiContact,
    // Mapear type (español) a group (inglés)
    group: API_TO_APP_GROUP[apiContact.type] || 'None',
  };
}

/**
 * Transforma un array de contactos de la API al formato de la aplicación
 * @param {Array} apiContacts - Array de contactos con formato de API
 * @returns {Array} Array de contactos con formato de App
 */
export function transformContactsFromAPI(apiContacts) {
  return apiContacts.map(transformContactFromAPI);
}

/**
 * Transforma un contacto del formato de la aplicación al formato de la API
 * Convierte el campo 'group' (inglés) a 'type' (español)
 *
 * @param {Object} appContact - Contacto con formato de App (usa 'group')
 * @returns {Object} Contacto con formato de API (usa 'type')
 *
 * @example
 * // Input de la App:
 * { fullname: "Juan", phonenumber: "123", email: "j@j.com", group: "Family" }
 * // Output para la API:
 * { fullname: "Juan", phonenumber: "123", email: "j@j.com", type: "familia" }
 */
export function transformContactToAPI(appContact) {
  const { group, ...rest } = appContact;
  return {
    ...rest,
    type: APP_TO_API_TYPE[group] || 'personal',
  };
}
