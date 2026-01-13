import prisma from "../../config/prisma.js";

export const getSuperAdminDashboard = async (req, res) => {
    try {
        /* ---------- Fetch Hotels ---------- */
        const hotels = await prisma.hotel.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        return res.status(200).json({
            totalHotels: hotels.length,
            hotels,
        });
    } catch (error) {
        console.error("SuperAdmin dashboard error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
