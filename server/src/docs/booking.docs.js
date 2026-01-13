/**
 * @swagger
 * /api/hotel/bookings:
 *   post:
 *     summary: Create a booking
 *     description: Creates a new booking. Validates guest, room, and checks for date conflicts. Requires HOTEL_ADMIN role.
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
 *               - guestId
 *               - roomId
 *               - checkIn
 *               - checkOut
 *             properties:
 *               guestId:
 *                 type: string
 *                 description: UUID of the guest
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               roomId:
 *                 type: string
 *                 description: UUID of the room
 *                 example: "660e8400-e29b-41d4-a716-446655440001"
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-15T14:00:00Z"
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-18T11:00:00Z"
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 hotelId:
 *                   type: integer
 *                 guestId:
 *                   type: string
 *                 roomId:
 *                   type: string
 *                 checkIn:
 *                   type: string
 *                   format: date-time
 *                 checkOut:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   example: BOOKED
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing fields, invalid dates, or invalid guest/room
 *       409:
 *         description: Room already booked for selected dates
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: List bookings
 *     description: Retrieves all bookings for the hotel with guest and room details. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
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
 *                   guestId:
 *                     type: string
 *                   roomId:
 *                     type: string
 *                   checkIn:
 *                     type: string
 *                     format: date-time
 *                   checkOut:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   guest:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       phone:
 *                         type: string
 *                   room:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       roomNumber:
 *                         type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 */
