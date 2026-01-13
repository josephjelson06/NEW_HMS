import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import {
    createGuest,
    getGuests,
} from "../../controllers/hotel/guestController.js";

const router = express.Router();

router.post(
    "/guests",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    createGuest
);

router.get(
    "/guests",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    getGuests
);

export default router;
