import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import {
    createBooking,
    getBookings,
} from "../../controllers/hotel/bookingController.js";

const router = express.Router();

router.post(
    "/bookings",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    createBooking
);

router.get(
    "/bookings",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    getBookings
);

export default router;
