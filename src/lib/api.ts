const API_URL = '/api';

export async function fetchPlatos() {
  try {
    console.log('Fetching platos from:', `${API_URL}/platos`);
    const response = await fetch(`${API_URL}/platos`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Platos received:', data);
    return data.map((plato: any) => ({
      ...plato,
      precio: parseFloat(plato.precio)
    }));
  } catch (error) {
    console.error('Error fetching platos:', error);
    return [];
  }
}

export async function fetchPedidos(fecha?: string) {
  try {
    const url = fecha ? `${API_URL}/pedidos?fecha=${fecha}` : `${API_URL}/pedidos`;
    console.log('Fetching pedidos from:', url);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Pedidos received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    return [];
  }
}

export async function toggleRecogido(id: number) {
  try {
    const response = await fetch(`${API_URL}/pedidos/${id}/toggle-recogido`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error toggling recogido:', error);
    throw error;
  }
}

export async function crearPedido(pedido: any) {
  try {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating pedido:', error);
    throw error;
  }
}