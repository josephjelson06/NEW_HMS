/**
 * @swagger
 * /api/hotel/guests:
 *   post:
 *     summary: Create a guest
 *     description: Creates a new guest for the hotel. Requires HOTEL_ADMIN role.
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
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@email.com
 *               phone:
 *                 type: string
 *                 example: "+919876543210"
 *               idType:
 *                 type: string
 *                 example: Passport
 *               idNumber:
 *                 type: string
 *                 example: AB1234567
 *     responses:
 *       201:
 *         description: Guest created successfully
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
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   nullable: true
 *                 phone:
 *                   type: string
 *                 idType:
 *                   type: string
 *                   nullable: true
 *                 idNumber:
 *                   type: string
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields or phone already exists
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: List guests
 *     description: Retrieves all guests for the hotel. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Guests retrieved successfully
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
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                     nullable: true
 *                   phone:
 *                     type: string
 *                   idType:
 *                     type: string
 *                     nullable: true
 *                   idNumber:
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
