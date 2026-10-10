/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         displayName:
 *           type: string
 *           example: ronaldovenancio
 *         email:
 *           type: string
 *           nullable: true
 *           example: user@example.com
 *         oauthProvider:
 *           type: string
 *           example: github
 *         oauthId:
 *           type: string
 *           example: "145623392"
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - displayName
 *         - oauthProvider
 *         - oauthId
 *         - createdAt
 *       properties:
 *         displayName:
 *           type: string
 *           example: Test User
 *         email:
 *           type: string
 *           nullable: true
 *           example: test@example.com
 *         oauthProvider:
 *           type: string
 *           example: github
 *         oauthId:
 *           type: string
 *           example: test-user-001
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-10-05T18:30:00.000Z
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       204:
 *         description: User updated successfully
 *       400:
 *         description: Validation failed or invalid id
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */