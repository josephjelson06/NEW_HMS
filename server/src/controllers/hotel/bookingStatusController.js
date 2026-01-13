import prisma from "../../config/prisma.js";

/* ----------------------------------------------------
   CHECK-IN BOOKING
---------------------------------------------------- */
export const checkInBooking = async (req, res) => {
  const hotelId = req.user.hotelId;
  const bookingId = req.params.id;

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        hotelId,
      },
      include: {
        room: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "BOOKED") {
      return res.status(400).json({
        message: "Only BOOKED bookings can be checked in",
      });
    }

    if (booking.room.status === "OCCUPIED") {
      return res.status(409).json({
        message: "Room is already occupied",
      });
    }

    await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CHECKED_IN" },
      }),
      prisma.room.update({
        where: { id: booking.roomId },
        data: { status: "OCCUPIED" },
      }),
    ]);

    return res.status(200).json({
      message: "Guest checked in successfully",
    });
  } catch (error) {
    console.error("Check-in error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* ----------------------------------------------------
   CHECK-OUT BOOKING
---------------------------------------------------- */
export const checkOutBooking = async (req, res) => {
  const hotelId = req.user.hotelId;
  const bookingId = req.params.id;

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        hotelId,
      },
      include: {
        room: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status !== "CHECKED_IN") {
      return res.status(400).json({
        message: "Only CHECKED_IN bookings can be checked out",
      });
    }

    await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CHECKED_OUT" },
      }),
      prisma.room.update({
        where: { id: booking.roomId },
        data: { status: "AVAILABLE" },
      }),
    ]);

    return res.status(200).json({
      message: "Guest checked out successfully",
    });
  } catch (error) {
    console.error("Check-out error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
