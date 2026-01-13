import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import { getHotelDashboard } from "../../controllers/hotel/dashboardController.js";

const router = express.Router();

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("HOTEL_ADMIN"),
    getHotelDashboard
);

export default router;
