#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Iniciando instalación de Pizarra Virtual...${NC}"

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "Docker no está instalado. Por favor, instala Docker primero."
    exit 1
fi

# Verificar Docker Compose
if ! command -v docker compose &> /dev/null; then
    echo "Docker Compose no está instalado. Por favor, instala Docker Compose primero."
    exit 1
fi

# Limpiar contenedores existentes
echo -e "${GREEN}Limpiando ambiente anterior si existe...${NC}"
docker compose down -v 2>/dev/null

# Crear directorios necesarios
echo -e "${GREEN}Creando estructura de directorios...${NC}"
mkdir -p docker/mysql/data
mkdir -p docker/mysql/init

# Copiar archivo de inicialización de base de datos
cp init.sql docker/mysql/init/

# Construir y levantar contenedores
echo -e "${GREEN}Construyendo y levantando contenedores Docker...${NC}"
docker compose up --build -d

# Esperar a que la base de datos esté lista
echo -e "${GREEN}Esperando a que la base de datos esté lista...${NC}"
sleep 10

echo -e "${BLUE}Instalación completada!${NC}"
echo -e "La aplicación estará disponible en: http://localhost:3000"
echo -e "La base de datos está disponible en: localhost:3306"