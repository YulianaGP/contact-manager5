# Contact Manager 5

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.1.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

**A modern, full-featured contact management application built with React 18, featuring advanced search, sorting, and RESTful API integration.**

[View Demo](#) • [Report Bug](https://github.com/YulianaGP/contact-manager5/issues) • [Request Feature](https://github.com/YulianaGP/contact-manager5/issues)

</div>

---

## Overview

Contact Manager 5 is a production-ready web application designed to efficiently manage contacts with a clean, intuitive interface. Built with modern React patterns and best practices, it demonstrates advanced state management, API integration with bidirectional data transformation, and enterprise-level architecture.

### Key Highlights for Recruiters

- **Full-stack Integration**: RESTful API with bidirectional data transformation layer
- **Advanced State Management**: Context API with optimistic UI updates and performance optimization
- **Complex Search & Filtering**: Real-time search with dropdown results across multiple fields
- **Persistent Sorting**: Global sort state synchronized across multiple views
- **Production-Ready Code**: Immutable state patterns, custom hooks, and modular architecture
- **Responsive Design**: Mobile-first approach with Tailwind CSS and automatic dark mode

---

## Features

### Core Functionality
- **CRUD Operations**: Full create, read, update, and delete functionality with API integration
- **Intelligent Search**: Real-time search across name, phone, and email with dropdown preview
- **Alphabetical Sorting**: Persistent A-Z/Z-A sorting across all pages
- **Favorites Management**: Mark and organize favorite contacts with dedicated view
- **Group Organization**: Visual organization by Work, Friends, Family, Client, and None categories
- **Contact Details Modal**: Quick view for complete contact information

### Technical Features
- **Bidirectional Data Transformation**: Seamless conversion between API format (Spanish) and app format (English)
- **Optimistic UI Updates**: Graceful fallback when API operations are unavailable
- **Performance Optimized**: `useMemo` and `useCallback` for efficient re-renders
- **Dark Mode Support**: Automatic theme switching with Tailwind CSS
- **Fully Responsive**: Optimized for mobile (320px+), tablet, and desktop

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework with hooks | 18.3.1 |
| **Vite** | Build tool with HMR | 5.4.10 |
| **React Router** | Client-side routing | 7.1.1 |
| **Tailwind CSS** | Utility-first styling | 3.4.15 |
| **Context API** | Global state management | Built-in |
| **RESTful API** | External contact data | Mock API |

---

## Architecture & Design Patterns

### Component Structure

```
src/
├── components/
│   ├── ContactCard.jsx              # Reusable contact card component
│   ├── ContactListPage.jsx          # Main contacts view with sorting
│   ├── ContactDetailsModal.jsx      # Contact details overlay
│   ├── ContactEditForm.jsx          # Edit contact form modal
│   ├── ContactModal.jsx             # Create contact form modal
│   ├── Header.jsx                   # Navigation with search dropdown
│   ├── Footer.jsx                   # Footer component
│   ├── Landing.jsx                  # Landing page
│   ├── pages/
│   │   ├── FavoritesPage.jsx       # Favorites view with sorting
│   │   └── GroupsPage.jsx          # Grouped contacts view
│   └── utils/
│       ├── groupColors.js          # Group color configuration
│       └── groupMapping.js         # API ↔ App data transformation
├── context/
│   ├── ContactsContext.jsx         # Global state provider
│   └── useContacts.js              # Custom hook for context access
├── layout/
│   └── Layout.jsx                  # Main layout with sidebar
├── services/
│   └── contactService.js           # API service layer
├── App.jsx                         # Root component with routing
├── main.jsx                        # Application entry point
└── index.css                       # Global styles
```

### State Management Architecture

**Context API with Custom Hook Pattern**
- `ContactsContext`: Provides global state for contacts, loading, error, and sorting
- `useContacts()`: Custom hook for consuming context with type safety
- **Immutable Updates**: All state changes use spread operators and array methods
- **Performance Optimization**: `useMemo` for value memoization, `useCallback` for function identity

### Data Flow

```
API (Spanish format)
  ↓ transformContactsFromAPI()
App State (English format)
  ↓ Component rendering
User interactions
  ↓ transformContactToAPI()
API (Spanish format)
```

**Key Functions:**
- `transformContactsFromAPI()`: Converts `type: "familia"` → `group: "Family"`
- `transformContactToAPI()`: Converts `group: "Family"` → `type: "familia"`

---

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn

### Clone Repository
```bash
git clone https://github.com/YulianaGP/contact-manager5.git
cd contact-manager5
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=https://entermocks.vercel.app/api/contacts
```

### Development Server
```bash
npm run dev
```
Application runs at `http://localhost:5174`

### Production Build
```bash
npm run build
npm run preview
```

---

## API Integration

### Endpoints Used

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| GET | `/api/contacts` | Fetch all contacts | ✅ Working |
| POST | `/api/contacts` | Create new contact | ✅ Working |
| PUT | `/api/contacts/:id` | Update contact | ⚠️ 405 (Optimistic fallback) |
| DELETE | `/api/contacts/:id` | Delete contact | ✅ Working |

### Data Transformation Layer

**API Format (Spanish):**
```json
{
  "id": "240",
  "fullname": "Maria García",
  "phonenumber": "555-1234",
  "email": "maria@example.com",
  "type": "familia"
}
```

**App Format (English):**
```json
{
  "id": "240",
  "fullname": "Maria García",
  "phonenumber": "555-1234",
  "email": "maria@example.com",
  "group": "Family",
  "isFavorite": false
}
```

**Mapping Configuration:**
```javascript
const API_TO_APP_GROUP = {
  'trabajo': 'Work',
  'amigos': 'Friends',
  'familia': 'Family',
  'cliente': 'Client',
  'personal': 'None'
};
```

---

## Key Features Deep Dive

### 1. Intelligent Search with Dropdown

**Implementation:** [Header.jsx:30-95](src/components/Header.jsx#L30-L95)

- **Multi-field Search**: Searches across `fullname`, `phonenumber`, and `email`
- **Contains Match**: Uses `.includes()` for flexible matching (not just prefix)
- **Live Results**: Dropdown shows all matching contacts with scrolling
- **Click Outside Detection**: Auto-closes dropdown when clicking elsewhere
- **Details Modal Integration**: Click on result opens full contact details

```javascript
const filteredContacts = contacts.filter(contact => {
  const query = searchQuery.toLowerCase();
  return (
    contact.fullname?.toLowerCase().includes(query) ||
    contact.phonenumber?.toLowerCase().includes(query) ||
    contact.email?.toLowerCase().includes(query)
  );
});
```

### 2. Persistent Sorting Across Pages

**Implementation:** [ContactsContext.jsx:70-85](src/context/ContactsContext.jsx#L70-L85)

- **Global Sort State**: Single `sortOrder` state in context ('asc' | 'desc')
- **Reusable Sort Function**: `getSortedContacts()` can sort any contact array
- **Alphabetical by Name**: Uses `.localeCompare()` for proper locale-aware sorting
- **Synchronized UI**: Sort button shows current order across all pages

**Pages with sorting:**
- [ContactListPage.jsx](src/components/ContactListPage.jsx)
- [FavoritesPage.jsx](src/components/pages/FavoritesPage.jsx)
- [GroupsPage.jsx](src/components/pages/GroupsPage.jsx)

### 3. Optimistic UI Updates

**Implementation:** [ContactsContext.jsx:34-50](src/context/ContactsContext.jsx#L34-L50)

**Problem**: Mock API returns 405 Method Not Allowed for PUT/PATCH operations

**Solution**: Graceful degradation with local updates

```javascript
try {
  const updated = await updateContact(id, contactData);
  setContacts(prev => prev.map(c => (c.id === id ? updated : c)));
  return updated;
} catch (error) {
  if (error.message.includes('405')) {
    console.warn('API does not support updates. Updating locally only.');
    const updatedContact = { id, ...contactData };
    setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...updatedContact } : c)));
    return updatedContact;
  }
  throw error;
}
```

**Result**: Users can still edit contacts; changes persist in session but not across page reloads.

### 4. Group Organization with Colors

**Implementation:** [GroupsPage.jsx](src/components/pages/GroupsPage.jsx) + [groupColors.js](src/components/utils/groupColors.js)

- **Visual Categorization**: Each group has unique color scheme
- **Collapsible Sections**: Expand/collapse groups independently
- **Contact Count Badges**: Real-time count display for each group
- **Read-Only Cards**: Simplified card view without actions
- **Sorted Within Groups**: Respects global sort order

---

## Performance Optimizations

### React Optimization Techniques

1. **Memoized Context Value**
   ```javascript
   const value = useMemo(() => ({
     contacts, isLoading, error, loadContacts, addContact,
     updateContactInContext, removeContact, toggleFavorite,
     isCreateOpen, openCreate, closeCreate,
     sortOrder, toggleSortOrder, getSortedContacts,
   }), [/* dependencies */]);
   ```

2. **Callback Memoization**
   ```javascript
   const toggleSortOrder = useCallback(() => {
     setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
   }, []);
   ```

3. **Derived State Pattern**: Favorite count computed on render, not stored redundantly

### Build Optimizations

- **Vite**: Lightning-fast HMR and optimized production builds
- **Code Splitting**: Route-based splitting with React Router
- **Tree Shaking**: Unused code eliminated in production
- **Minification**: CSS and JS minified and compressed

---

## Code Quality & Best Practices

### React Patterns
- ✅ Functional components with hooks
- ✅ Custom hooks for logic reuse (`useContacts`)
- ✅ Compound component pattern (Layout + Outlet)
- ✅ Controlled components for forms
- ✅ Immutable state updates
- ✅ Proper key usage in lists
- ✅ Effect cleanup (click-outside detection)

### Code Organization
- ✅ Separation of concerns (UI, logic, data)
- ✅ Service layer for API calls
- ✅ Utility functions for transformations
- ✅ Consistent naming conventions
- ✅ Modular file structure
- ✅ No dead code

### Styling
- ✅ Mobile-first responsive design
- ✅ Consistent spacing and typography
- ✅ Accessible color contrast ratios
- ✅ Dark mode support
- ✅ Semantic HTML5 elements

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## Responsive Breakpoints

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `sm` | 640px | Tablets (portrait) |
| `md` | 768px | Tablets (landscape) |
| `lg` | 1024px | Laptops/Desktops |
| `xl` | 1280px | Large desktops |

---

## Future Enhancements

- [ ] Backend database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Contact import/export (CSV, vCard)
- [ ] Advanced filtering (multiple criteria)
- [ ] Contact photos/avatars upload
- [ ] Tags system beyond groups
- [ ] Contact notes and history
- [ ] Unit and integration tests (Jest, React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] PWA capabilities (offline support)

---

## Technical Documentation

For detailed technical analysis of problems solved during development:
- [CONTACT_DATA_FLOW_BUG_ANALYSIS.md](CONTACT_DATA_FLOW_BUG_ANALYSIS.md) - In-depth explanation of bidirectional data transformation implementation

---

## Author

**Yuliana**

Feel free to reach out for questions or collaboration opportunities:

- GitHub: [@YulianaGP](https://github.com/YulianaGP)
- LinkedIn: [Your LinkedIn Profile](#)
- Email: [your.email@example.com](#)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using React, Vite, and Tailwind CSS**

⭐ Star this repo if you find it useful!

</div>
