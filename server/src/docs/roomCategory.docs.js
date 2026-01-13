/**
 * @swagger
 * /api/hotel/room-categories:
 *   post:
 *     summary: Create a room category
 *     description: Creates a new room category for the hotel. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - basePrice
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Deluxe Suite
 *               basePrice:
 *                 type: integer
 *                 example: 5000
 *               capacity:
 *                 type: integer
 *                 example: 2
 *               amenities:
 *                 type: string
 *                 description: JSON string of amenities array
 *                 example: '["WiFi", "TV", "Mini Bar"]'
 *     responses:
 *       201:
 *         description: Room category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 hotelId:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Deluxe Suite
 *                 basePrice:
 *                   type: integer
 *                   example: 5000
 *                 capacity:
 *                   type: integer
 *                   example: 2
 *                 amenities:
 *                   type: string
 *                   nullable: true
 *                   example: '["WiFi", "TV", "Mini Bar"]'
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing fields, invalid amenities JSON, or category already exists
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: List room categories
 *     description: Retrieves all room categories for the hotel. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Room categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "550e8400-e29b-41d4-a716-446655440000"
 *                   hotelId:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Deluxe Suite
 *                   basePrice:
 *                     type: integer
 *                     example: 5000
 *                   capacity:
 *                     type: integer
 *                     example: 2
 *                   amenities:
 *                     type: string
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 */
