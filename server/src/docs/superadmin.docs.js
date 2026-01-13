/**
 * @swagger
 * tags:
 *   name: SuperAdmin
 *   description: Super Admin management endpoints
 */

/**
 * @swagger
 * /api/superadmin/dashboard:
 *   get:
 *     summary: Get SuperAdmin dashboard data
 *     description: Retrieves all hotels with their details. Requires SUPER_ADMIN role.
 *     tags:
 *       - SuperAdmin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalHotels:
 *                   type: integer
 *                   example: 5
 *                 hotels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Grand Hotel
 *                       slug:
 *                         type: string
 *                         example: grand-hotel
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have SUPER_ADMIN role
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
