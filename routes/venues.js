const express = require('express');
const router = express.Router();

const venuesController = require('../controllers/venues');
const { validateVenueRequest } = require('../middleware/validate');

/**
 * @openapi
 * components:
 *   schemas:
 *     Venue:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - city
 *         - state
 *         - country
 *         - capacity
 *       properties:
 *         _id:
 *           type: string
 *           example: 6abc0ee560c932f59bc7c91b
 *         name:
 *           type: string
 *           example: Recife Convention Center
 *         address:
 *           type: string
 *           example: Av. Example, 1000
 *         city:
 *           type: string
 *           example: Recife
 *         state:
 *           type: string
 *           example: PE
 *         country:
 *           type: string
 *           example: Brazil
 *         capacity:
 *           type: integer
 *           example: 500
 */

/**
 * @openapi
 * /venues:
 *   get:
 *     summary: Get all venues
 *     tags:
 *       - Venues
 *     responses:
 *       200:
 *         description: List of venues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venue'
 *       500:
 *         description: Unexpected server error
 */
router.get('/', venuesController.getAllVenues);

/**
 * @openapi
 * /venues/{id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags:
 *       - Venues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venue'
 *       400:
 *         description: Invalid venue ID
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Unexpected server error
 */
router.get('/:id', venuesController.getVenueById);

/**
 * @openapi
 * /venues:
 *   post:
 *     summary: Create a new venue
 *     tags:
 *       - Venues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - city
 *               - state
 *               - country
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Recife Convention Center
 *               address:
 *                 type: string
 *                 example: Av. Example, 1000
 *               city:
 *                 type: string
 *                 example: Recife
 *               state:
 *                 type: string
 *                 example: PE
 *               country:
 *                 type: string
 *                 example: Brazil
 *               capacity:
 *                 type: integer
 *                 example: 500
 *     responses:
 *       201:
 *         description: Venue created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Unexpected server error
 */
router.post('/', validateVenueRequest, venuesController.createVenue);

/**
 * @openapi
 * /venues/{id}:
 *   put:
 *     summary: Update a venue
 *     tags:
 *       - Venues
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
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - city
 *               - state
 *               - country
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Venue updated successfully
 *       400:
 *         description: Invalid input or venue ID
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Unexpected server error
 */
router.put('/:id', validateVenueRequest, venuesController.updateVenue);

/**
 * @openapi
 * /venues/{id}:
 *   delete:
 *     summary: Delete a venue
 *     tags:
 *       - Venues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Venue deleted successfully
 *       400:
 *         description: Invalid venue ID
 *       404:
 *         description: Venue not found
 *       500:
 *         description: Unexpected server error
 */
router.delete('/:id', venuesController.deleteVenue);

module.exports = router;