import prisma from "../../config/prisma.js";

/* ----------------------------------------------------
   CREATE ROOM CATEGORY
---------------------------------------------------- */
export const createRoomCategory = async (req, res) => {
  try {
    const hotelId = req.user.hotelId;
    const { name, basePrice, capacity, amenities } = req.body;

    if (!name || !basePrice || !capacity) {
      return res.status(400).json({
        message: "Name, basePrice and capacity are required",
      });
    }

    // Optional: validate amenities is JSON-string-like
    let amenitiesString = null;
    if (amenities) {
      try {
        JSON.parse(amenities);
        amenitiesString = amenities;
      } catch {
        return res.status(400).json({
          message: "Amenities must be a valid JSON string",
        });
      }
    }

    const category = await prisma.roomCategory.create({
      data: {
        hotelId,
        name,
        basePrice: Number(basePrice),
        capacity: Number(capacity),
        amenities: amenitiesString,
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    // Unique constraint (hotelId + name)
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Room category already exists for this hotel",
      });
    }

    console.error("Create room category error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* ----------------------------------------------------
   LIST ROOM CATEGORIES
---------------------------------------------------- */
export const getRoomCategories = async (req, res) => {
  try {
    const hotelId = req.user.hotelId;

    const categories = await prisma.roomCategory.findMany({
      where: { hotelId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error("Get room categories error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
