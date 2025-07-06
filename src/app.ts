import 'module-alias/register';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import localizacaoRouter from '@routes/LocalizacaoRouter';
import viagemRoutes from '@routes/ViagemRouter';
import transporteRoutes from '@routes/TransporteRouter';
import itinerarioRoutes from '@routes/ItinerarioRouter';
import usuarioRoutes from '@routes/UsuarioRouter';
import solicitacoesroutes from '@routes/SolicitacaoRouter';
import orcamentoRoutes from '@routes/OrcamentoRouter';
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
app.use('/', transporteRoutes);
app.use('/', itinerarioRoutes);
app.use('/', usuarioRoutes);
app.use('/', solicitacoesroutes);
app.use('/', orcamentoRoutes);
app.use('/', login);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorDefaultHandler());

app.get('/', (req: Request, res: Response) => {
    res.send('API está rodando!');
});

export default app