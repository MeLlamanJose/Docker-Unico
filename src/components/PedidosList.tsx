import React from 'react';
import { Pedido } from '../types';
import { toggleRecogido } from '../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PedidosListProps {
  pedidos: Pedido[];
}

export function PedidosList({ pedidos }: PedidosListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: toggleRecogido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
    },
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{pedido.cliente}</div>
                  {pedido.telefono && (
                    <div className="text-sm text-gray-500">{pedido.telefono}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{pedido.platos}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pedido.recogido
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {pedido.recogido ? 'Recogido' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => mutation.mutate(pedido.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {pedido.recogido ? 'Marcar como pendiente' : 'Marcar como recogido'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}