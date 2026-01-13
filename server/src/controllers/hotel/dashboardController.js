import prisma from "../../config/prisma.js";

export const getHotelDashboard = async (req, res) => {
  try {
    const hotelId = req.user.hotelId;

    if (!hotelId) {
      return res.status(400).json({
        message: "Hotel context missing",
      });
    }

    /* ---------- Fetch Hotel ---------- */
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }

    /* ---------- Aggregates (safe even if tables empty) ---------- */
    const roomsCount = await prisma.room?.count({
      where: { hotelId },
    }).catch(() => 0);

    const bookingsCount = await prisma.booking?.count({
      where: { hotelId },
    }).catch(() => 0);

    const guestsCount = await prisma.guest?.count({
      where: { hotelId },
    }).catch(() => 0);

    return res.status(200).json({
      hotel,
      stats: {
        rooms: roomsCount,
        bookings: bookingsCount,
        guests: guestsCount,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
