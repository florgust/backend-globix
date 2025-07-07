import 'module-alias/register';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import solicitacoesRouter from '@routes/SolicitacaoRouter';
import localizacaoRouter from '@routes/LocalizacaoRouter';
import viagemRoutes from '@routes/ViagemRouter';
import transporteRouter from '@routes/TransporteRouter';
import itinerarioRouter from '@routes/ItinerarioRouter';
import usuarioRouter from '@routes/UsuarioRouter';
import orcamentoRouter from '@routes/OrcamentoRouter';
import notificacaoRouter from '@routes/NotificacaoRouter';
import fotoRouter from '@routes/FotoRouter';
import login from '@routes/LoginRouter';

import { errorDefaultHandler } from '@middlewares/ErrorHandler';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('@config/swagger');

const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', viagemRoutes);
app.use('/', localizacaoRouter);
app.use('/', transporteRouter);
app.use('/', itinerarioRouter);
app.use('/', usuarioRouter);
app.use('/', solicitacoesRouter);
app.use('/', orcamentoRouter);
app.use('/', notificacaoRouter);
app.use('/', fotoRouter);
app.use('/', login);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorDefaultHandler());

app.get('/', (req: Request, res: Response) => {
    res.send('API está rodando!');
});

export default app;