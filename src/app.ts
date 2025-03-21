import express, { Request, Response } from 'express';
import exemploRoutes from './routes/exemploRoutes';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/UsuarioRouter';

dotenv.config();

const app = express();
app.use(express.json());

//app.use('/api', exemploRoutes);
app.use('/usuario', usuarioRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API está rodando!');
});

const PORT = process.env.PORT || 3000; // Usar uma variável de ambiente ou o valor 3000 por padrão
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
