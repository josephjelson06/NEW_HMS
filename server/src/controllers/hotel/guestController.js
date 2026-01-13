import prisma from "../../config/prisma.js";

/* ----------------------------------------------------
   CREATE GUEST
---------------------------------------------------- */
export const createGuest = async (req, res) => {
  try {
    const hotelId = req.user.hotelId;
    const { firstName, lastName, email, phone, idType, idNumber } = req.body;

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        message: "firstName, lastName and phone are required",
      });
    }

    const guest = await prisma.guest.create({
      data: {
        hotelId,
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        email: email ? String(email).trim() : null,
        phone: String(phone).trim(),
        idType: idType ? String(idType).trim() : null,
        idNumber: idNumber ? String(idNumber).trim() : null,
      },
    });

    return res.status(201).json(guest);
  } catch (error) {
    // Unique constraint: (hotelId, phone)
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Guest with this phone already exists for this hotel",
      });
    }

    console.error("Create guest error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* ----------------------------------------------------
   LIST GUESTS
---------------------------------------------------- */
export const getGuests = async (req, res) => {
  try {
    const hotelId = req.user.hotelId;

    const guests = await prisma.guest.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(guests);
  } catch (error) {
    console.error("Get guests error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
