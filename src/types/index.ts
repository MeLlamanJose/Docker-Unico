export interface Plato {
  id: number;
  nombre: string;
  dia_semana: string;
  cocinados: number;
  restantes: number;
  precio: string | number;
  imagen?: string;
  orden: number;
}

export interface Pedido {
  id: number;
  cliente: string;
  telefono?: string;
  platos: string;
  origen: string;
  fecha_hora: string;
  recogido: boolean;
  fecha_reserva: string;
  fecha_creacion: string;
  fuente: string;
  borrado: boolean;
}

export interface DiaFestivo {
  id: number;
  fecha: string;
  descripcion?: string;
  fecha_creacion: string;
}