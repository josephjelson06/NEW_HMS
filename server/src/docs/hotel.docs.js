/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: Hotel management endpoints
 */

/**
 * @swagger
 * /api/hotel/dashboard:
 *   get:
 *     summary: Get hotel dashboard data
 *     description: Retrieves hotel information and aggregated statistics including rooms, bookings, and guests counts. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
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
 *                 hotel:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Grand Hotel
 *                     slug:
 *                       type: string
 *                       example: grand-hotel
 *                 stats:
 *                   type: object
 *                   properties:
 *                     rooms:
 *                       type: integer
 *                       example: 50
 *                     bookings:
 *                       type: integer
 *                       example: 120
 *                     guests:
 *                       type: integer
 *                       example: 85
 *       400:
 *         description: Hotel context missing from request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hotel context missing
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       404:
 *         description: Hotel not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hotel not found
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
