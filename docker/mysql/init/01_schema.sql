-- Configuración inicial de caracteres
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;

-- Crear base de datos
DROP DATABASE IF EXISTS pizarra_virtual;
CREATE DATABASE pizarra_virtual
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE pizarra_virtual;

-- Crear usuario
DROP USER IF EXISTS 'pizarra_user'@'%';
CREATE USER 'pizarra_user'@'%' IDENTIFIED BY 'nueva';
GRANT ALL PRIVILEGES ON pizarra_virtual.* TO 'pizarra_user'@'%';
FLUSH PRIVILEGES;

-- Crear tablas
CREATE TABLE platos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    dia_semana VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    cocinados INT DEFAULT 0,
    restantes INT DEFAULT 0,
    precio DECIMAL(10,2) DEFAULT 0.00,
    imagen VARCHAR(255),
    orden INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    telefono VARCHAR(20),
    platos TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    origen VARCHAR(50) DEFAULT 'web',
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    recogido BOOLEAN DEFAULT FALSE,
    fecha_reserva DATE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fuente VARCHAR(50) DEFAULT 'manual',
    borrado BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dias_festivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE menu_version (
    id INT AUTO_INCREMENT PRIMARY KEY,
    version INT NOT NULL DEFAULT 1,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;