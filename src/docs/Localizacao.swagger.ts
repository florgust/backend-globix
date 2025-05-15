/**
 * @swagger
 * tags:
 *   name: Localizações
 *   description: Endpoints relacionados às localizações da viagem
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Localizacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idViagem:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Passeio no Centro"
 *         idaEnderecoPartida:
 *           type: string
 *           example: "Av. Paulista, 1000 - São Paulo"
 *         idaEnderecoChegada:
 *           type: string
 *           example: "Museu do Ipiranga, São Paulo"
 *         idaDataPartida:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         idaDataChegada:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         voltaEnderecoPartida:
 *           type: string
 *           example: "Museu do Ipiranga, São Paulo"
 *         voltaEnderecoChegada:
 *           type: string
 *           example: "Av. Paulista, 1000 - São Paulo"
 *         voltaDataPartida:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         voltaDataChegada:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           example: "2025-05-15T14:00:00Z"
 *         dataAtualizacao:
 *           type: string
 *           format: date-time
 *           example: "2025-05-15T14:00:00Z"
 */

/**
 * @swagger
 * /localizacoes:
 *   get:
 *     summary: Retorna todas as localizações
 *     tags: [Localizações]
 *     responses:
 *       200:
 *         description: Lista de localizações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Localizacao'
 */

/**
 * @swagger
 * /localizacao/{id}:
 *   get:
 *     summary: Retorna uma localização por ID
 *     tags: [Localizações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     responses:
 *       200:
 *         description: Localização encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Localizacao'
 *       404:
 *         description: Localização não encontrada
 */

/**
 * @swagger
 * /localizacao:
 *   post:
 *     summary: Cria uma nova localização
 *     tags: [Localizações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Localizacao'
 *     responses:
 *       201:
 *         description: Localização criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Localizacao'
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /localizacao/{id}:
 *   put:
 *     summary: Atualiza uma localização existente
 *     tags: [Localizações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Localizacao'
 *     responses:
 *       200:
 *         description: Localização atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Localizacao'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Localização não encontrada
 */

/**
 * @swagger
 * /localizacao/{id}:
 *   delete:
 *     summary: Deleta uma localização
 *     tags: [Localizações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     responses:
 *       200:
 *         description: Localização deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Localização deletada com sucesso."
 *       404:
 *         description: Localização não encontrada
 */
