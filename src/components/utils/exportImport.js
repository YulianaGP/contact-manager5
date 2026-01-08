/**
 * Utilities for exporting and importing contacts
 * Located in: src/components/utils/exportImport.js
 */

/**
 * Export contacts to JSON file
 * @param {Array} contacts - Array of contact objects
 * @param {string} filename - Optional custom filename
 */
export function exportToJSON(contacts, filename = null) {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const defaultFilename = `contacts_${date}.json`;

  const dataStr = JSON.stringify(contacts, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || defaultFilename;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * Export contacts to CSV file
 * @param {Array} contacts - Array of contact objects
 * @param {string} filename - Optional custom filename
 */
export function exportToCSV(contacts, filename = null) {
  const date = new Date().toISOString().split('T')[0];
  const defaultFilename = `contacts_${date}.csv`;

  // CSV Headers
  const headers = ['Name', 'Phone', 'Email', 'Group', 'Favorite'];

  // Convert contacts to CSV rows
  const rows = contacts.map(contact => [
    contact.fullname || '',
    contact.phonenumber || '',
    contact.email || '',
    contact.group || 'None',
    contact.isFavorite ? 'Yes' : 'No'
  ]);

  // Escape and quote fields that contain commas or quotes
  const escapeField = (field) => {
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };

  // Build CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(escapeField).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || defaultFilename;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * Import contacts from JSON file
 * @param {File} file - The JSON file to import
 * @returns {Promise<Array>} - Promise that resolves to array of contacts
 */
export async function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const contacts = JSON.parse(e.target.result);

        // Validate that it's an array
        if (!Array.isArray(contacts)) {
          reject(new Error('Invalid JSON format: expected an array of contacts'));
          return;
        }

        // Validate contact structure
        const validatedContacts = contacts.map((contact, index) => {
          if (!contact.fullname) {
            throw new Error(`Contact at position ${index + 1} is missing required field: fullname`);
          }

          return {
            fullname: contact.fullname,
            phonenumber: contact.phonenumber || '',
            email: contact.email || '',
            group: contact.group || 'None',
            isFavorite: contact.isFavorite || false
          };
        });

        resolve(validatedContacts);
      } catch (error) {
        reject(new Error(`Error parsing JSON: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
}

/**
 * Import contacts from CSV file
 * @param {File} file - The CSV file to import
 * @returns {Promise<Array>} - Promise that resolves to array of contacts
 */
export async function importFromCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csvContent = e.target.result;
        const lines = csvContent.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          reject(new Error('CSV file is empty or has no data rows'));
          return;
        }

        // Skip header row
        const dataLines = lines.slice(1);

        // Parse CSV (simple parser, handles quoted fields)
        const parseCSVLine = (line) => {
          const fields = [];
          let currentField = '';
          let inQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
              if (inQuotes && nextChar === '"') {
                currentField += '"';
                i++; // Skip next quote
              } else {
                inQuotes = !inQuotes;
              }
            } else if (char === ',' && !inQuotes) {
              fields.push(currentField.trim());
              currentField = '';
            } else {
              currentField += char;
            }
          }
          fields.push(currentField.trim());
          return fields;
        };

        const contacts = dataLines.map((line, index) => {
          const fields = parseCSVLine(line);

          if (fields.length < 5) {
            throw new Error(`Row ${index + 2} has insufficient columns`);
          }

          const [fullname, phonenumber, email, group, favorite] = fields;

          if (!fullname || fullname.trim() === '') {
            throw new Error(`Row ${index + 2} is missing required field: Name`);
          }

          return {
            fullname: fullname.trim(),
            phonenumber: phonenumber.trim(),
            email: email.trim(),
            group: group.trim() || 'None',
            isFavorite: favorite.trim().toLowerCase() === 'yes'
          };
        });

        resolve(contacts);
      } catch (error) {
        reject(new Error(`Error parsing CSV: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
}
