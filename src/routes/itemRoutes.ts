import { Router } from 'express';
import * as itemController from '../controllers/itemController';
import { authenticateJWT, requireAdmin } from '../middleware/authMiddleware';

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
router.post('/', authenticateJWT, requireAdmin, itemController.create);

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
router.put('/:id', authenticateJWT, itemController.update);

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