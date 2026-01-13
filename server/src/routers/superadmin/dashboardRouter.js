import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import { getSuperAdminDashboard } from "../../controllers/superadmin/dashboardController.js";

const router = express.Router();

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("SUPER_ADMIN"),
    getSuperAdminDashboard
);

export default router;
