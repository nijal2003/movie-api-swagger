const express = require('express');
const controller = require('../controllers/movieController');
const { validateCreate, validateUpdate } = require('../validations/movieValidation');

const router = express.Router();

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: List all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Array of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/', (req, res, next) => controller.list(req, res, next));

/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Not found
 */
router.get('/:id', (req, res, next) => controller.get(req, res, next));

/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string }
 *               director: { type: string }
 *               releaseYear: { type: integer }
 *               genre: { type: string }
 *               rating: { type: number }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Validation error
 */
router.post('/', validateCreate, (req, res, next) => controller.create(req, res, next));

/**
 * @openapi
 * /movies/{id}:
 *   put:
 *     summary: Update existing movie (partial supported)
 *     tags: [Movies]
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
 *             properties:
 *               title: { type: string }
 *               director: { type: string }
 *               releaseYear: { type: integer }
 *               genre: { type: string }
 *               rating: { type: number }
 *     responses:
 *       200:
 *         description: Updated movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', validateUpdate, (req, res, next) => controller.update(req, res, next));

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Delete movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted (no content)
 *       404:
 *         description: Not found
 */
router.delete('/:id', (req, res, next) => controller.remove(req, res, next));

module.exports = router;
