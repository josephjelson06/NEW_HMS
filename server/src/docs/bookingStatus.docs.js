/**
 * @swagger
 * /api/hotel/bookings/{id}/check-in:
 *   patch:
 *     summary: Check-in a booking
 *     description: Marks a BOOKED booking as CHECKED_IN and sets the room status to OCCUPIED. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking UUID
 *     responses:
 *       200:
 *         description: Guest checked in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Guest checked in successfully
 *       400:
 *         description: Only BOOKED bookings can be checked in
 *       404:
 *         description: Booking not found
 *       409:
 *         description: Room is already occupied
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 *
 * /api/hotel/bookings/{id}/check-out:
 *   patch:
 *     summary: Check-out a booking
 *     description: Marks a CHECKED_IN booking as CHECKED_OUT and sets the room status back to AVAILABLE. Requires HOTEL_ADMIN role.
 *     tags:
 *       - Hotel
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking UUID
 *     responses:
 *       200:
 *         description: Guest checked out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Guest checked out successfully
 *       400:
 *         description: Only CHECKED_IN bookings can be checked out
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have HOTEL_ADMIN role
 *       500:
 *         description: Internal server error
 */
