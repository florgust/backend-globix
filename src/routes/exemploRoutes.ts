import express from 'express';
import { exemploController } from '../controllers/exemploController';

const router = express.Router();

router.get('/exemplo', exemploController);

export default router;
