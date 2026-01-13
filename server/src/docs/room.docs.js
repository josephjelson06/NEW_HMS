/**
 * @swagger
 * /api/hotel/rooms:
 *   post:
 *     summary: Create a room
 *     description: Creates a new room in the hotel. Requires HOTEL_ADMIN role.
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
 *               - categoryId
 *               - roomNumber
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: UUID of the room category
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               roomNumber:
 *                 type: string
 *                 example: "101"
 *               floor:
 *                 type: string
 *                 example: "1"
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, MAINTENANCE]
 *                 default: AVAILABLE
 *                 example: AVAILABLE
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "660e8400-e29b-41d4-a716-446655440001"
 *                 hotelId:
 *                   type: integer
 *                   example: 1
 *                 categoryId:
 *                   type: string
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 roomNumber:
 *                   type: string
 *                   example: "101"
 *                 floor:
 *                   type: string
 *                   nullable: true
 *                   example: "1"
 *                 status:
 *                   type: string
 *                   example: AVAILABLE
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing fields, invalid category, or room number already exists
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: List rooms
 *     description: Retrieves all rooms for the hotel with category details. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rooms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   hotelId:
 *                     type: integer
 *                   categoryId:
 *                     type: string
 *                   roomNumber:
 *                     type: string
 *                   floor:
 *                     type: string
 *                     nullable: true
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       capacity:
 *                         type: integer
 *                       basePrice:
 *                         type: integer
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 */
