# PUT vs PATCH: API Update Method Issue (RESOLVED - Local Updates Only)

**FINAL RESOLUTION**: The entermocks.vercel.app API **does not support updating contacts** at all (neither PUT nor PATCH). This is a common limitation in free mock APIs. The solution is to implement **optimistic local updates** - changes are saved in the frontend state but not persisted to the server.

## Problem Summary

When attempting to update contacts via the API, we encountered a **405 (Method Not Allowed)** error with both `PUT` and `PATCH` methods.

## Error Details

```
PUT https://entermocks.vercel.app/api/contacts/240 405 (Method Not Allowed)
```

## Root Cause

The entermocks.vercel.app API does not support the `PUT` method for updating contacts. It only accepts `PATCH` for partial updates.

## Understanding PUT vs PATCH

### PUT (Complete Replacement)
- **Purpose**: Replace the entire resource
- **Behavior**: All fields must be sent, even unchanged ones
- **Side effect**: Missing fields may be deleted or set to null
- **Use case**: When you want to completely overwrite a resource
- **Example**:
  ```http
  PUT /contacts/240
  {
    "fullname": "John Doe",
    "phonenumber": "555-1234",
    "email": "john@example.com",
    "type": "familia"
  }
  ```
  This replaces the entire contact resource.

### PATCH (Partial Update)
- **Purpose**: Update only specific fields
- **Behavior**: Only sent fields are updated
- **Side effect**: Unmentioned fields remain unchanged
- **Use case**: When you want to modify specific attributes without affecting others
- **Example**:
  ```http
  PATCH /contacts/240
  {
    "fullname": "Jane Doe"
  }
  ```
  This only updates the name; other fields stay the same.

## Why PATCH is Preferred

1. **Efficiency**: Send only the data that changes
2. **Safety**: No risk of accidentally deleting fields
3. **Bandwidth**: Smaller payload size
4. **Flexibility**: Better for mobile and low-bandwidth scenarios
5. **Modern standard**: RESTful API best practices favor PATCH for updates

## Solution Applied

Implemented optimistic local updates in `src/context/ContactsContext.jsx`:

```javascript
// Try to update via API
try {
  const updated = await updateContact(id, contactData);
  setContacts(prev => prev.map(c => (c.id === id ? updated : c)));
  return updated;
} catch (error) {
  // If API doesn't support updates (405), update locally only
  if (error.message.includes('405')) {
    console.warn('API does not support updates. Updating locally only.');
    const updatedContact = { id, ...contactData };
    setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...updatedContact } : c)));
    return updatedContact;
  }
  throw error;
}
```

**Note**: Updates are only persisted in the browser session. Refreshing the page or calling "Load" will fetch the original data from the API.

## API Compatibility

The entermocks.vercel.app mock API supports:
- ✅ `GET` - Fetch contacts
- ✅ `POST` - Create new contact
- ✅ `DELETE` - Remove contact
- ❌ `PUT` - Not supported (405 error)
- ❌ `PATCH` - Not supported (CORS blocked)

## Lessons Learned

1. Always check API documentation for supported HTTP methods
2. When receiving 405 errors, the endpoint may not support that operation at all
3. Free mock APIs often have limited functionality (no updates)
4. Implement graceful fallbacks for unsupported operations
5. Optimistic updates provide a good user experience when API is limited
6. Local-only updates work until the user refreshes or reloads from the API

## Related Files

- [src/services/contactService.js](src/services/contactService.js) - Service layer with HTTP methods
- [src/context/ContactsContext.jsx](src/context/ContactsContext.jsx) - Context calling the update function
- [src/components/ContactEditForm.jsx](src/components/ContactEditForm.jsx) - UI component triggering updates
