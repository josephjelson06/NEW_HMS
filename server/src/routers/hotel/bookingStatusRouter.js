import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import {
    checkInBooking,
    checkOutBooking,
} from "../../controllers/hotel/bookingStatusController.js";

const router = express.Router();

router.patch(
    "/bookings/:id/check-in",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    checkInBooking
);

router.patch(
    "/bookings/:id/check-out",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    checkOutBooking
);

export default router;
