import React from 'react';
import { Plato, Pedido } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleRecogido } from '../lib/api';

interface PizarraTableProps {
  platos: Plato[];
  pedidos: Pedido[];
  showRecogidos: boolean;
  onToggleRecogidos: () => void;
  onNuevoPedido: () => void;
}

export function PizarraTable({ platos, pedidos, showRecogidos, onToggleRecogidos, onNuevoPedido }: PizarraTableProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: toggleRecogido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
    },
  });

  const filteredPedidos = showRecogidos 
    ? pedidos 
    : pedidos.filter(pedido => !pedido.recogido);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th colSpan={4} className="border border-gray-200 p-2">
              <button
                onClick={onNuevoPedido}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                -- Nuevo Pedido --
              </button>
            </th>
            {platos.map((plato) => (
              <th key={plato.id} className="border border-gray-200 p-2 w-24">
                <div className="h-48">
                  <img
                    src={`/images/${plato.imagen}`}
                    alt={plato.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <div className="writing-vertical-rl transform rotate-180 h-32 mt-2">
                  {plato.nombre}
                </div>
              </th>
            ))}
          </tr>
          <tr>
            <th className="border border-gray-200 p-2">Total</th>
            <th className="border border-gray-200 p-2">
              <button
                onClick={onToggleRecogidos}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                {showRecogidos ? 'Esconder Recogidos' : 'Mostrar Recogidos'}
              </button>
            </th>
            <th className="border border-gray-200 p-2">Cliente</th>
            <th className="border border-gray-200 p-2">Telf</th>
            {platos.map((plato) => (
              <th key={plato.id} className="border border-gray-200 p-2">
                <div className="text-xs text-gray-500">{plato.cocinados}</div>
                <div className="text-lg font-bold">{plato.restantes}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.map((pedido) => {
            const platosArray = pedido.platos.split(', ');
            const platosCount = platosArray.reduce((acc, plato) => {
              acc[plato] = (acc[plato] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);

            return (
              <tr key={pedido.id} className={pedido.recogido ? 'bg-gray-100' : ''}>
                <td className="border border-gray-200 p-2">
                  {platosArray.length}
                </td>
                <td className="border border-gray-200 p-2">
                  <button
                    onClick={() => mutation.mutate(pedido.id)}
                    className={`px-4 py-2 rounded ${
                      pedido.recogido
                        ? 'bg-gray-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {pedido.recogido ? 'Recogido' : 'Pendiente'}
                  </button>
                </td>
                <td className="border border-gray-200 p-2">{pedido.cliente}</td>
                <td className="border border-gray-200 p-2">
                  {pedido.telefono ? pedido.telefono.slice(-3) : '-'}
                </td>
                {platos.map((plato) => (
                  <td
                    key={plato.id}
                    className={`border border-gray-200 p-2 text-center ${
                      platosCount[plato.nombre] ? 'bg-yellow-100' : ''
                    }`}
                  >
                    {platosCount[plato.nombre] || ''}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}