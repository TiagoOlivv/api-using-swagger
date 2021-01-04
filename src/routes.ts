import path from 'path';
import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import User from './controllers/UserController';

const routes = Router();

const specs = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'This is a simple Library CRUD API.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, './routes.ts')],
});

routes.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true }),
);

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the user.
 *          name:
 *            type: string
 *            description: The name of the user.
 *        example:
 *           name: Tiago
 */

/**
 *  @swagger
 *  tags:
 *    name: Users
 *    description: API to manage the users in the library.
 */

/**
 *  @swagger
 *  /users:
 *    get:
 *      summary: Lists all the users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: The list of all users.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 */
routes.get('/users/', User.index);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user not found.
 */
routes.get('/users/:id', User.show);

/**
 *  @swagger
 *  /users:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: The created user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: Server error
 */
routes.post('/users/', User.create);

/**
 *  @swagger
 *  /users/{id}:
 *    put:
 *      summary: Update the user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: The updated user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        404:
 *          description: The user not found
 *        500:
 *          description: Server error
 */
routes.put('/users/:id', User.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user not found.
 */
routes.delete('/users/:id', User.delete);

export default routes;
