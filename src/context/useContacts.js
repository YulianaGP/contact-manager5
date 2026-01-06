import { useContext } from 'react';
import { ContactsContext } from './ContactsContext';

export function useContacts() {
  return useContext(ContactsContext);
}
