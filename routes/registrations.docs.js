/**
 * @openapi
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         eventId:
 *           type: string
 *           example: 6abd7d689c79eb3343484a14
 *         userId:
 *           type: string
 *           example: 6ab31d85db594823f806f432
 *         registrationDate:
 *           type: string
 *           format: date-time
 *           example: 2026-10-05T19:15:00.000Z
 *         status:
 *           type: string
 *           example: confirmed
 *
 *     RegistrationInput:
 *       type: object
 *       required:
 *         - eventId
 *         - userId
 *         - registrationDate
 *         - status
 *       properties:
 *         eventId:
 *           type: string
 *           example: 6abd7d689c79eb3343484a14
 *         userId:
 *           type: string
 *           example: 6ab31d85db594823f806f432
 *         registrationDate:
 *           type: string
 *           format: date-time
 *           example: 2026-10-05T19:15:00.000Z
 *         status:
 *           type: string
 *           example: confirmed
 */

/**
 * @openapi
 * /registrations:
 *   get:
 *     summary: Get all registrations
 *     tags:
 *       - Registrations
 *     responses:
 *       200:
 *         description: List of registrations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create a registration
 *     tags:
 *       - Registrations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationInput'
 *     responses:
 *       201:
 *         description: Registration created
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /registrations/{id}:
 *   get:
 *     summary: Get a registration by ID
 *     tags:
 *       - Registrations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a registration
 *     tags:
 *       - Registrations
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
 *             $ref: '#/components/schemas/RegistrationInput'
 *     responses:
 *       204:
 *         description: Registration updated successfully
 *       400:
 *         description: Validation failed or invalid id
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a registration
 *     tags:
 *       - Registrations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Registration deleted successfully
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Internal server error
 */