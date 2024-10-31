import { Router } from 'express';
import pool from '../db.js';

export const router = Router();

router.get('/', async (req, res) => {
  try {
    console.log('Fetching platos...');
    const [rows] = await pool.query(`
      SELECT * FROM platos 
      WHERE (dia_semana = CASE 
        WHEN DAYNAME(CURDATE()) = 'Monday' THEN 'Lunes'
        WHEN DAYNAME(CURDATE()) = 'Tuesday' THEN 'Martes'
        WHEN DAYNAME(CURDATE()) = 'Wednesday' THEN 'Miércoles'
        WHEN DAYNAME(CURDATE()) = 'Thursday' THEN 'Jueves'
        WHEN DAYNAME(CURDATE()) = 'Friday' THEN 'Viernes'
        WHEN DAYNAME(CURDATE()) = 'Saturday' THEN 'Sábado'
        WHEN DAYNAME(CURDATE()) = 'Sunday' THEN 'Domingo'
      END OR dia_semana = 'Todos los dias' OR dia_semana = 'Postres')
      ORDER BY FIELD(dia_semana, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Todos los dias', 'Postres'), orden
    `);
    console.log('Platos fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error in /platos route:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});