import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Error {
      status?: number;
      message?: string;
    }
  }
}