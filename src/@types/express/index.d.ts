// src/@types/express/index.d.ts
import { User } from '@models/Usuario'; // ou onde seu tipo de usuário estiver

declare global {
    namespace Express {
        interface Request {
            user?: User; // ou: any, se quiser deixar mais flexível
        }
    }
}