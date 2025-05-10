import 'module-alias/register';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import localizacaoRouter from '@routes/LocalizacaoRouter';
import viagemRoutes from '@routes/ViagemRouter';
import transporteRoutes from '@routes/TransporteRouter';
import itinerarioRoutes from '@routes/ItinerarioRouter';
import usuarioRoutes from '@routes/UsuarioRouter';
import solicitacoesroutes from '@routes/SolicitacaoRouter';
import login from '@routes/LoginRouter';
import { errorDefaultHandler } from '@middlewares/ErrorHandler';

const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', viagemRoutes);
app.use('/', localizacaoRouter);
app.use('/', transporteRoutes);
app.use('/', itinerarioRoutes);
app.use('/', usuarioRoutes);
app.use('/', solicitacoesroutes);
app.use('/', login);

app.use(errorDefaultHandler());

app.get('/', (req: Request, res: Response) => {
    res.send('API está rodando!');
});

const PORT = process.env.PORT ?? 3000; //Porta padrão 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app