import { Router } from 'express';
import * as itemController from '../controllers/itemController';
import { authenticateJWT, requireAdmin } from '../middleware/authMiddleware';
import { body, param } from 'express-validator';

const router = Router();

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: List of items
 */
router.get('/', authenticateJWT, itemController.getAll);

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item found
 *       404:
 *         description: Item not found
 */
router.get('/:id', authenticateJWT, itemController.getById);

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Create new item (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 *       403:
 *         description: Admin access required
 */
router.post('/',
  authenticateJWT,
  requireAdmin,
  [
    body('name').isString().trim().notEmpty().escape().withMessage('Name is required'),
    body('description').isString().trim().notEmpty().escape().withMessage('Description is required'),
  ],
  itemController.create
);

/**
 * @openapi
 * /items/{id}:
 *   put:
 *     summary: Update item
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item not found
 */
router.put('/:id',
  authenticateJWT,
  [
    param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
    body('name').optional().isString().trim().escape(),
    body('description').optional().isString().trim().escape(),
  ],
  itemController.update
);

/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     summary: Delete item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
router.delete('/:id', authenticateJWT, itemController.remove);

export default router; 