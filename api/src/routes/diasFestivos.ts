import { Router } from 'express';
import pool from '../db.js';

export const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM dias_festivos ORDER BY fecha');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching días festivos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});