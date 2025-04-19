import { Router } from 'express';
import { login } from '@controllers/api/auth/LoginController'

const router = Router();

router.post('/login', login);

export default router;