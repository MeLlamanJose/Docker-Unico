-- Insertar platos de ejemplo
INSERT INTO platos (nombre, dia_semana, cocinados, restantes, precio, imagen, orden) VALUES
('Potaje de garbanzos', 'Lunes', 20, 20, 3.50, 'potaje.jpg', 1),
('Lentejas con chorizo', 'Lunes', 15, 15, 3.50, 'lentejas.jpg', 2),
('Arroz con pollo', 'Lunes', 25, 25, 4.95, 'arroz_pollo.jpg', 3),
('Ensalada mixta', 'Todos los dias', 30, 30, 3.75, 'ensalada.jpg', 1),
('1/2 Pollo asado', 'Todos los dias', 40, 40, 5.50, 'pollo.jpg', 2),
('Tarta de queso', 'Postres', 20, 20, 2.50, 'tarta_queso.jpg', 1),
('Flan casero', 'Postres', 15, 15, 2.00, 'flan.jpg', 2);

-- Insertar algunos pedidos de ejemplo
INSERT INTO pedidos (cliente, telefono, platos, origen, fecha_reserva, recogido) VALUES
('Juan Pérez', '666111222', 'Potaje de garbanzos, Tarta de queso', 'web', CURDATE(), 0),
('María García', '666333444', '1/2 Pollo asado, Ensalada mixta', 'web', CURDATE(), 0);

-- Insertar versión inicial del menú
INSERT INTO menu_version (version) VALUES (1);