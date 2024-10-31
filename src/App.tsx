import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PizarraVirtual from './pages/PizarraVirtual';
import EditarMenu from './pages/EditarMenu';
import EditarCalendario from './pages/EditarCalendario';
import ListaPedidos from './pages/ListaPedidos';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<PizarraVirtual />} />
          <Route path="/editar-menu" element={<EditarMenu />} />
          <Route path="/editar-calendario" element={<EditarCalendario />} />
          <Route path="/lista-pedidos" element={<ListaPedidos />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;