import { Request, Response } from 'express';
import { exemploService } from '../services/exemploService';

export const exemploController = (req: Request, res: Response) => {
    const data = exemploService();
    res.json({ message: data });
};
