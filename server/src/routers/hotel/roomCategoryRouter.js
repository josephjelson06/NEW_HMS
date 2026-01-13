import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import {
    createRoomCategory,
    getRoomCategories,
} from "../../controllers/hotel/roomCategoryController.js";

const router = express.Router();

router.post(
    "/room-categories",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    createRoomCategory
);

router.get(
    "/room-categories",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    getRoomCategories
);

export default router;
