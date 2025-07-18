import { Router } from 'express';
import * as authController from '../controllers/authController';
import { body } from 'express-validator';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login',
  [
    body('username').isString().trim().notEmpty().escape().withMessage('Username is required'),
    body('password').isString().trim().notEmpty().escape().withMessage('Password is required'),
  ],
  authController.login
);

export default router; 