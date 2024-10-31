import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">La Cocina Popular</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/editar-menu" className="text-gray-600 hover:text-gray-900">
                Editar Menú
              </Link>
              <Link to="/editar-calendario" className="text-gray-600 hover:text-gray-900">
                Editar Calendario
              </Link>
              <Link to="/lista-pedidos" className="text-gray-600 hover:text-gray-900">
                Lista Pedidos
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-8">{children}</main>
    </div>
  );
}