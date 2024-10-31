import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPlatos, fetchPedidos } from '../lib/api';
import { Layout } from '../components/Layout';
import { PizarraTable } from '../components/PizarraTable';
import { Modal } from '../components/Modal';
import { NuevoPedidoForm } from '../components/NuevoPedidoForm';

export default function PizarraVirtual() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRecogidos, setShowRecogidos] = useState(true);

  const { data: platos = [] } = useQuery({
    queryKey: ['platos'],
    queryFn: fetchPlatos
  });

  const { data: pedidos = [] } = useQuery({
    queryKey: ['pedidos'],
    queryFn: () => fetchPedidos()
  });

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <PizarraTable 
          platos={platos} 
          pedidos={pedidos}
          showRecogidos={showRecogidos}
          onToggleRecogidos={() => setShowRecogidos(!showRecogidos)}
          onNuevoPedido={() => setIsModalOpen(true)}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Nuevo Pedido"
        >
          <NuevoPedidoForm
            platos={platos}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </Layout>
  );
}