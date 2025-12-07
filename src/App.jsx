import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Layout from './layout/Layout';
import ContactCard from './components/ContactCard';
import ContactListPage from './components/ContactListPage'; 

function App() {
  
  return (
    <Routes>
      {/* Landing separado (sin Layout) */}
      <Route path="/" element={<Landing />} />

      {/* ÁREA PRINCIPAL: el Layout se monta cuando el usuario entra a /contacts */}
      <Route path="/contacts" element={<Layout />}>
        {/* Index route dentro del layout */}
        <Route index element={<ContactListPage />} />

        {/* Ejemplo de ruta de detalle; usa tu ContactCard o componente de detalle */}
        <Route path=":id" element={<ContactCard />} />
      </Route>

      {/* Si quieres añadir otras páginas públicas (about, help), agrégalas aquí */}
    </Routes>
  );
}
export default App
