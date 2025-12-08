import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Layout from './layout/Layout';
import ContactCard from './components/ContactCard';
import ContactListPage from './components/ContactListPage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    <Routes>
      {/* Landing page (without Layout) */}
      <Route path="/" element={<Landing />} />

      {/* MAIN AREA: Layout is mounted when user enters /contacts or related routes */}
      <Route element={<Layout />}>
        {/* All contacts page */}
        <Route path="/contacts" element={<ContactListPage />} />
        
        {/* Favorites page */}
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* Detail route example; use your ContactCard or detail component */}
        <Route path="/contacts/:id" element={<ContactCard />} />
      </Route>

      {/* Add other public pages (about, help) here if needed */}
    </Routes>
  );
}
export default App
