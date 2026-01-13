import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import {
    createRoom,
    getRooms,
} from "../../controllers/hotel/roomController.js";

const router = express.Router();

router.post(
    "/rooms",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    createRoom
);

router.get(
    "/rooms",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    getRooms
);

export default router;
