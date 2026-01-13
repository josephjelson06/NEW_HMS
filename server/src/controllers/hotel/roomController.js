import prisma from "../../config/prisma.js";

/* ----------------------------------------------------
   CREATE ROOM
---------------------------------------------------- */
export const createRoom = async (req, res) => {
    try {
        const hotelId = req.user.hotelId;
        const { categoryId, roomNumber, floor, status } = req.body;

        if (!categoryId || !roomNumber) {
            return res.status(400).json({
                message: "categoryId and roomNumber are required",
            });
        }

        // Validate category belongs to the same hotel
        const category = await prisma.roomCategory.findFirst({
            where: {
                id: categoryId,
                hotelId,
            },
        });

        if (!category) {
            return res.status(400).json({
                message: "Invalid category for this hotel",
            });
        }

        // Normalize status for SQLite (string-based)
        const allowedStatus = ["AVAILABLE", "MAINTENANCE"];
        const roomStatus = status && allowedStatus.includes(status)
            ? status
            : "AVAILABLE";

        const room = await prisma.room.create({
            data: {
                hotelId,
                categoryId,
                roomNumber: String(roomNumber),
                floor: floor ? String(floor) : null,
                status: roomStatus,
            },
        });

        return res.status(201).json(room);
    } catch (error) {
        // Unique constraint: (hotelId, roomNumber)
        if (error.code === "P2002") {
            return res.status(400).json({
                message: "Room number already exists for this hotel",
            });
        }

        console.error("Create room error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

/* ----------------------------------------------------
   LIST ROOMS
---------------------------------------------------- */
export const getRooms = async (req, res) => {
    try {
        const hotelId = req.user.hotelId;

        const rooms = await prisma.room.findMany({
            where: { hotelId },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        capacity: true,
                        basePrice: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json(rooms);
    } catch (error) {
        console.error("Get rooms error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
