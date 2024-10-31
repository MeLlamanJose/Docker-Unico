# Pizarra Virtual - Sistema de Gestión de Pedidos

Sistema completo de gestión de pedidos con asistente virtual integrado.

## Requisitos

- Docker y Docker Compose
- Node.js 20.x (para desarrollo local)
- MySQL 8.0+

## Instalación Rápida

1. Clona el repositorio
2. Ejecuta el script de instalación:
   ```bash
   ./setup.sh
   ```

## Desarrollo Local

```bash
npm install
npm run dev
```

## Estructura del Proyecto

```
proyecto-pizarra-virtual/
├── src/
│   ├── components/     # Componentes React
│   ├── pages/         # Páginas principales
│   ├── lib/           # Utilidades y API
│   ├── types/         # Tipos TypeScript
│   └── store/         # Estado global
├── public/            # Archivos estáticos
└── docker/           # Configuración Docker
```

## Base de Datos

La configuración de la base de datos se encuentra en `docker/mysql/init.sql`