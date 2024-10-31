import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { router as platosRouter } from './routes/platos.js';
import { router as pedidosRouter } from './routes/pedidos.js';
import { router as diasFestivosRouter } from './routes/diasFestivos.js';

const app = express();
const port = process.env.PORT || 8000;

// Basic CORS configuration
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../../dist')));

// API routes
app.use('/api/platos', platosRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/dias-festivos', diasFestivosRouter);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Serve frontend for any other route
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});