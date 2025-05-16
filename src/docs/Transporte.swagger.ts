/**
 * @swagger
 * tags:
 *   name: Transporte
 *   description: Endpoints relacionados aos transportes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transporte:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         viagemId:
 *           type: integer
 *         tipoTransporte:
 *           type: string
 *         descricao:
 *           type: string
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *         dataAtualizacao:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /transportes:
 *   get:
 *     summary: Lista todos os transportes
 *     tags: [Transporte]
 *     responses:
 *       200:
 *         description: Lista de transportes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transporte'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /transporte/{id}:
 *   get:
 *     summary: Busca um transporte por ID
 *     tags: [Transporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do transporte
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transporte encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transporte'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Transporte não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /transporte:
 *   post:
 *     summary: Cria um novo transporte
 *     tags: [Transporte]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - viagemId
 *               - tipoTransporte
 *             properties:
 *               viagemId:
 *                 type: integer
 *               tipoTransporte:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transporte criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transporte'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /transporte/{id}:
 *   put:
 *     summary: Atualiza um transporte existente
 *     tags: [Transporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do transporte
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               viagemId:
 *                 type: integer
 *               tipoTransporte:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transporte atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transporte'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Transporte não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * /transporte/{id}:
 *   delete:
 *     summary: Deleta um transporte
 *     tags: [Transporte]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do transporte
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transporte deletado com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Transporte não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
