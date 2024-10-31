import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plato } from '../types';
import { crearPedido } from '../lib/api';

interface NuevoPedidoFormProps {
  platos: Plato[];
  onClose: () => void;
}

export function NuevoPedidoForm({ platos, onClose }: NuevoPedidoFormProps) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [platosSeleccionados, setPlatosSeleccionados] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: crearPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || platosSeleccionados.length === 0) return;

    mutation.mutate({
      cliente: nombre,
      telefono,
      platos: platosSeleccionados.join(', '),
      origen: 'web',
      fecha_hora: new Date().toISOString(),
      recogido: false,
      fecha_reserva: new Date().toISOString().split('T')[0],
      fecha_creacion: new Date().toISOString(),
      fuente: 'manual',
      borrado: false
    });
  };

  const handlePlatoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const plato = e.target.value;
    if (plato && !platosSeleccionados.includes(plato)) {
      setPlatosSeleccionados([...platosSeleccionados, plato]);
    }
  };

  const removePlato = (plato: string) => {
    setPlatosSeleccionados(platosSeleccionados.filter(p => p !== plato));
  };

  const platosDisponibles = platos.filter(p => p.restantes > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre del cliente
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="plato" className="block text-sm font-medium text-gray-700">
          Añadir plato
        </label>
        <select
          id="plato"
          onChange={handlePlatoChange}
          value=""
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Seleccione un plato</option>
          {platosDisponibles.map((plato) => (
            <option key={plato.id} value={plato.nombre}>
              {plato.nombre} (Disponibles: {plato.restantes})
            </option>
          ))}
        </select>
      </div>

      {platosSeleccionados.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Platos seleccionados:</h4>
          <ul className="mt-2 space-y-2">
            {platosSeleccionados.map((plato, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
              >
                <span>{plato}</span>
                <button
                  type="button"
                  onClick={() => removePlato(plato)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {mutation.isPending ? 'Guardando...' : 'Guardar pedido'}
        </button>
      </div>
    </form>
  );
}