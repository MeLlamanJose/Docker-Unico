import { Router } from 'express';
import pool from '../db.js';

export const router = Router();

// GET /pedidos
router.get('/', async (req, res) => {
  try {
    console.log('Fetching pedidos...');
    const { fecha } = req.query;
    let query = 'SELECT * FROM pedidos WHERE borrado = 0';
    const params: any[] = [];

    if (fecha) {
      query += ' AND DATE(fecha_reserva) = ?';
      params.push(fecha);
    }

    query += ' ORDER BY fecha_creacion DESC';
    
    const [rows] = await pool.query(query, params);
    console.log('Pedidos fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error in /pedidos route:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /pedidos/:id/toggle-recogido
router.post('/:id/toggle-recogido', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      'UPDATE pedidos SET recogido = NOT recogido WHERE id = ?',
      [id]
    );
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error toggling recogido:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /pedidos
router.post('/', async (req, res) => {
  try {
    const pedido = req.body;
    const [result] = await pool.query('INSERT INTO pedidos SET ?', [pedido]);
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating pedido:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});