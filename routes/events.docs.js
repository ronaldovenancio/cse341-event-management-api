/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         eventDate:
 *           type: string
 *           example: 2026-10-15
 *         startTime:
 *           type: string
 *           example: "14:00"
 *         endTime:
 *           type: string
 *           example: "16:00"
 *         venueId:
 *           type: string
 *         category:
 *           type: string
 *         capacity:
 *           type: integer
 *         organizerId:
 *           type: string
 *
 *     EventInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - eventDate
 *         - startTime
 *         - endTime
 *         - venueId
 *         - category
 *         - capacity
 *         - organizerId
 *       properties:
 *         title:
 *           type: string
 *           example: CSE 341 Final Project Demo
 *         description:
 *           type: string
 *           example: Test event for validating the Events API integration.
 *         eventDate:
 *           type: string
 *           example: 2026-10-15
 *         startTime:
 *           type: string
 *           example: "14:00"
 *         endTime:
 *           type: string
 *           example: "16:00"
 *         venueId:
 *           type: string
 *           example: 6abd54a6c547f3ae598e41a7
 *         category:
 *           type: string
 *           example: Technology
 *         capacity:
 *           type: integer
 *           example: 100
 *         organizerId:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 */

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Create an event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update an event
 *     tags:
 *       - Events
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
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       204:
 *         description: Event updated successfully
 *       400:
 *         description: Validation failed or invalid id
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete an event
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */