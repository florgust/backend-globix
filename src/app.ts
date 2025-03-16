import express, { Request, Response } from 'express';
import exemploRoutes from './routes/exemploRoutes';

const app = express();
app.use(express.json());

app.use('/api', exemploRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API está rodando!');
});

const PORT = process.env.PORT || 3000; // Usar uma variável de ambiente ou o valor 3000 por padrão
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
