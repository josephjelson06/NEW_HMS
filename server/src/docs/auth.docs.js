/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password, returns JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin1@hms.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     hotelSlug:
 *                       type: string
 *                       nullable: true
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials or inactive user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new hotel with admin
 *     description: Creates a new hotel and its admin user, returns JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotelName
 *               - hotelSlug
 *               - adminEmail
 *               - password
 *             properties:
 *               hotelName:
 *                 type: string
 *                 example: Grand Hotel
 *               hotelSlug:
 *                 type: string
 *                 example: grand-hotel
 *               adminEmail:
 *                 type: string
 *                 format: email
 *                 example: admin@grandhotel.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     hotelSlug:
 *                       type: string
 *       400:
 *         description: Missing fields, hotel slug exists, or email already registered
 *       500:
 *         description: Internal server error or HOTEL_ADMIN role not found
 */

