/**
 * @swagger
 * tags:
 *   name: Itinerarios
 *   description: Endpoints relacionados aos itinerários das viagens
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Itinerario:
 *       type: object
 *       required:
 *         - viagemId
 *         - tipoEvento
 *         - titulo
 *         - dataHora
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do itinerário
 *           example: 1
 *         viagemId:
 *           type: integer
 *           description: ID da viagem associada
 *           example: 5
 *         tipoEvento:
 *           type: string
 *           description: Tipo de evento no itinerário
 *           example: "Ponto Turístico"
 *         titulo:
 *           type: string
 *           description: Título do evento ou atividade
 *           example: "Visita ao Museu"
 *         dataHora:
 *           type: string
 *           format: date-time
 *           description: Data e hora do evento
 *           example: "2025-07-20T14:30:00Z"
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do evento (opcional)
 *           example: "Encontro com guia turístico na entrada principal"
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         dataAtualizacao:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização do registro
 */

/**
 * @swagger
 * /itinerarios:
 *   get:
 *     summary: Retorna todos os itinerários
 *     tags: [Itinerarios]
 *     responses:
 *       200:
 *         description: Lista de itinerários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Itinerario'
 */

/**
 * @swagger
 * /itinerario/{id}:
 *   get:
 *     summary: Retorna um itinerário pelo ID
 *     tags: [Itinerarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do itinerário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Itinerário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Itinerario'
 *       404:
 *         description: Itinerário não encontrado
 */

/**
 * @swagger
 * /itinerario:
 *   post:
 *     summary: Cria um novo itinerário
 *     tags: [Itinerarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itinerario'
 *     responses:
 *       201:
 *         description: Itinerário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Itinerario'
 *       400:
 *         description: Dados inválidos fornecidos
 */

/**
 * @swagger
 * /itinerario/{id}:
 *   put:
 *     summary: Atualiza um itinerário existente
 *     tags: [Itinerarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do itinerário a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itinerario'
 *     responses:
 *       200:
 *         description: Itinerário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Itinerario'
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Itinerário não encontrado
 */

/**
 * @swagger
 * /itinerario/{id}:
 *   delete:
 *     summary: Exclui um itinerário
 *     tags: [Itinerarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do itinerário a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Itinerário excluído com sucesso
 *       404:
 *         description: Itinerário não encontrado
 */
