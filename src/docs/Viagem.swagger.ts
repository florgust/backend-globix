/**
 * @swagger
 * tags:
 *   name: Viagem
 *   description: Endpoints relacionados às viagens
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Viagem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         dataInicio:
 *           type: string
 *           format: date-time
 *         dataFim:
 *           type: string
 *           format: date-time
 *         criadorId:
 *           type: integer
 *         codigoConvite:
 *           type: integer
 *         status:
 *           type: integer
 *         tipo:
 *           type: string
 *         quantidadeParticipante:
 *           type: integer
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *         dataAtualizacao:
 *           type: string
 *           format: date-time
 *     ViagemInput:
 *       type: object
 *       required:
 *         - nome
 *         - dataInicio
 *         - dataFim
 *         - criadorId
 *         - tipo
 *       properties:
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         dataInicio:
 *           type: string
 *           format: date-time
 *         dataFim:
 *           type: string
 *           format: date-time
 *         criadorId:
 *           type: integer
 *         tipo:
 *           type: string

 */

/**
 * @swagger
 * /viagens:
 *   get:
 *     summary: Lista todas as viagens
 *     tags: [Viagem]
 *     responses:
 *       200:
 *         description: Lista de viagens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Viagem'
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /viagem:
 *   post:
 *     summary: Cria uma nova viagem
 *     tags: [Viagem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ViagemInput'
 *     responses:
 *       201:
 *         description: Viagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viagem'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /viagem/{id}:
 *   get:
 *     summary: Retorna uma viagem pelo ID
 *     tags: [Viagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Viagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viagem'
 *       404:
 *         description: Viagem não encontrada
 *       500:
 *         description: Erro interno no servidor
 *
 *   put:
 *     summary: Atualiza uma viagem existente
 *     tags: [Viagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ViagemInput'
 *     responses:
 *       200:
 *         description: Viagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viagem'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Viagem não encontrada
 *       500:
 *         description: Erro interno no servidor
 *
 *   delete:
 *     summary: Deleta uma viagem
 *     tags: [Viagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Viagem deletada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Viagem não encontrada
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /viagem/codigo/{codigoConvite}:
 *   get:
 *     summary: Retorna uma viagem por código de convite
 *     tags: [Viagem]
 *     parameters:
 *       - in: path
 *         name: codigoConvite
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Viagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viagem'
 *       404:
 *         description: Viagem não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
