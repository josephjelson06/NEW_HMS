import prisma from "../../config/prisma.js";

/* ----------------------------------------------------
   CREATE BOOKING
---------------------------------------------------- */
export const createBooking = async (req, res) => {
  try {
    const hotelId = req.user.hotelId;
    const { guestId, roomId, checkIn, checkOut } = req.body;

    if (!guestId || !roomId || !checkIn || !checkOut) {
      return res.status(400).json({
        message: "guestId, roomId, checkIn and checkOut are required",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      return res.status(400).json({
        message: "Invalid check-in or check-out date",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        message: "checkOut must be after checkIn",
      });
    }

    /* ---------- Validate Guest ---------- */
    const guest = await prisma.guest.findFirst({
      where: { id: guestId, hotelId },
    });

    if (!guest) {
      return res.status(400).json({
        message: "Invalid guest for this hotel",
      });
    }

    /* ---------- Validate Room ---------- */
    const room = await prisma.room.findFirst({
      where: { id: roomId, hotelId },
    });

    if (!room) {
      return res.status(400).json({
        message: "Invalid room for this hotel",
      });
    }

    /* ---------- Booking Collision Check ---------- */
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        hotelId,
        roomId,
        status: { in: ["BOOKED", "CHECKED_IN"] },
        AND: [
          { checkIn: { lt: checkOutDate } },
          { checkOut: { gt: checkInDate } },
        ],
      },
    });

    if (conflictingBooking) {
      return res.status(409).json({
        message: "Room is already booked for the selected dates",
      });
    }

    /* ---------- Create Booking ---------- */
    const booking = await prisma.booking.create({
      data: {
        hotelId,
        guestId,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        status: "BOOKED",
      },
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* ----------------------------------------------------
   LIST BOOKINGS
---------------------------------------------------- */
export const getBookings = async (req, res) => {
  try {
    const hotelId = req.user.hotelId;

    const bookings = await prisma.booking.findMany({
      where: { hotelId },
      include: {
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        room: {
          select: {
            id: true,
            roomNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
