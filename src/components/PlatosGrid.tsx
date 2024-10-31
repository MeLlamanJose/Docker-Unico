import React from 'react';
import { Plato } from '../types';

interface PlatosGridProps {
  platos: Plato[];
}

export function PlatosGrid({ platos }: PlatosGridProps) {
  const platosAgrupados = platos.reduce((acc, plato) => {
    const categoria = plato.dia_semana;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(plato);
    return acc;
  }, {} as Record<string, Plato[]>);

  return (
    <div className="space-y-8">
      {Object.entries(platosAgrupados).map(([categoria, platosCategoria]) => (
        <div key={categoria} className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{categoria}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platosCategoria.map((plato) => (
              <div
                key={plato.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {plato.imagen && (
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={`/images/${plato.imagen}`}
                      alt={plato.nombre}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x200?text=No+imagen';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{plato.nombre}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600">
                      €{Number(plato.precio).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Disponibles: {plato.restantes}/{plato.cocinados}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}