import express from 'express';
import {
    shortenUrl,
    getAllUrls,
    redirectUrl,
    verifyPassword,
    toggleUrlStatus,
    resetPasswordAttempts,
} from '../controllers/urlController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://www.example.com/very/long/url
 *               alias:
 *                 type: string
 *                 example: myalias
 *               password:
 *                 type: string
 *                 description: Optional password protection
 *     responses:
 *       201:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/URL'
 *       401:
 *         description: Unauthorized
 */
router.post('/shorten', authenticate, shortenUrl);

/**
 * @swagger
 * /api/urls:
 *   get:
 *     summary: Get all URLs for authenticated user
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/URL'
 *       401:
 *         description: Unauthorized
 */
router.get('/urls', authenticate, getAllUrls);

/**
 * @swagger
 * /api/verify-password:
 *   post:
 *     summary: Verify password for protected URL
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shortUrl
 *               - password
 *             properties:
 *               shortUrl:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password verified
 *       401:
 *         description: Invalid password
 */
router.post('/verify-password', verifyPassword);

/**
 * @swagger
 * /api/toggle/{urlId}:
 *   put:
 *     summary: Toggle URL active status
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: urlId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status toggled
 *       401:
 *         description: Unauthorized
 */
router.put('/toggle/:urlId', authenticate, toggleUrlStatus);

/**
 * @swagger
 * /api/reset-attempts/{urlId}:
 *   put:
 *     summary: Reset password attempts
 *     tags: [URLs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: urlId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attempts reset
 *       401:
 *         description: Unauthorized
 */
router.put('/reset-attempts/:urlId', authenticate, resetPasswordAttempts);

/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123
 *     responses:
 *       302:
 *         description: Redirect to original URL
 *       404:
 *         description: URL not found
 */
router.get('/:shortUrl', redirectUrl);

export default router;