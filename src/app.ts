import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import viagemRoutes from './routes/ViagemRouter';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', viagemRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API está rodando!');
});

const PORT = process.env.PORT || 3000; //Porta padrão 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app