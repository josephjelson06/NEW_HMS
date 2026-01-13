import express from "express";
import authRouter from "./routers/auth/auth.router.js";
import swaggerRouter from "./routers/swagger/swagger.router.js";
import hotelDashboardRouter from "./routers/hotel/dashboardRouter.js";
import superAdminDashboardRouter from "./routers/superadmin/dashboardRouter.js";
import roomCategoryRouter from "./routers/hotel/roomCategoryRouter.js";
import roomRouter from "./routers/hotel/roomRouter.js";
import guestRouter from "./routers/hotel/guestRouter.js";
import bookingRouter from "./routers/hotel/bookingRouter.js";
import bookingStatusRouter from "./routers/hotel/bookingStatusRouter.js";







const app = express();

/* ---------- Global Middlewares ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- Swagger UI ---------- */
app.use("/api-docs", swaggerRouter);

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
})

/* ---------- Routes ---------- */
app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelDashboardRouter);
app.use("/api/superadmin", superAdminDashboardRouter);
app.use("/api/hotel", roomCategoryRouter);
app.use("/api/hotel", roomRouter);
app.use("/api/hotel", guestRouter);
app.use("/api/hotel", bookingRouter);
app.use("/api/hotel", bookingStatusRouter);

/* ---------- Fallback ---------- */
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;