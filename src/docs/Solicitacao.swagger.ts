/**
 * @swagger
 * tags:
 *   name: Solicitacao
 *   description: Endpoints relacionados às solicitações de participação em viagens
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Solicitacao:
 *       type: object
 *       properties:
 *         idViagem:
 *           type: integer
 *           example: 1
 *         idUsuario:
 *           type: integer
 *           example: 2
 *         papel:
 *           type: string
 *           enum: [organizador, participante, organizadorPromovido]
 *           example: participante
 *         status:
 *           type: integer
 *           description: 1 = Ativo, 0 = Inativo
 *           example: 1
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T12:34:56Z"
 *         dataAtualizacao:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T12:34:56Z"
 */

/**
 * @swagger
 * /solicitacoes/usuario/{idUsuario}:
 *   get:
 *     summary: Listar todas as solicitações feitas por um usuário
 *     tags: [Solicitacao]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de solicitações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solicitacao'
 *       500:
 *         description: Erro ao buscar solicitações
 */

/**
 * @swagger
 * /solicitacoes/viagem/{idViagem}:
 *   get:
 *     summary: Listar todas as solicitações de uma viagem
 *     tags: [Solicitacao]
 *     parameters:
 *       - in: path
 *         name: idViagem
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da viagem
 *     responses:
 *       200:
 *         description: Lista de solicitações da viagem
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solicitacao'
 *       500:
 *         description: Erro ao buscar solicitações
 */

/**
 * @swagger
 * /solicitacao/{idUsuario}/{idViagem}:
 *   post:
 *     summary: Criar uma nova solicitação de participação em uma viagem
 *     tags: [Solicitacao]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário solicitante
 *       - in: path
 *         name: idViagem
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da viagem
 *     responses:
 *       201:
 *         description: Solicitação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitacao'
 *       400:
 *         description: Conflito de datas ou dados inválidos
 *       404:
 *         description: Viagem não encontrada
 *       500:
 *         description: Erro ao criar solicitação
 */

/**
 * @swagger
 * /solicitacao/promocao/{idViagem}/{idUsuarioOrganizador}:
 *   post:
 *     summary: Promover ou despromover um usuário para organizador da viagem
 *     tags: [Solicitacao]
 *     parameters:
 *       - in: path
 *         name: idViagem
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da viagem
 *       - in: path
 *         name: idUsuarioOrganizador
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do organizador que realiza a promoção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuarioSolicitante
 *             properties:
 *               idUsuarioSolicitante:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Papel atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitacao'
 *       404:
 *         description: Solicitação do usuário não encontrada
 *       500:
 *         description: Erro ao promover/despromover organizador
 */

/**
 * @swagger
 * /solicitacao/{idViagem}/{idUsuario}/status:
 *   put:
 *     summary: Atualizar o status (ativo/inativo) de uma solicitação
 *     tags: [Solicitacao]
 *     parameters:
 *       - in: path
 *         name: idViagem
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da viagem
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário da solicitação
 *     responses:
 *       200:
 *         description: Status da solicitação atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitacao'
 *       404:
 *         description: Solicitação não encontrada
 *       500:
 *         description: Erro ao atualizar status
 */
