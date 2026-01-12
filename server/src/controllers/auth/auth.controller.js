import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
    try {
        const { hotelName, hotelSlug, adminEmail, password } = req.body;

        /* ---------- Validation ---------- */
        if (!hotelName || !hotelSlug || !adminEmail || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        /* ---------- Check Uniqueness ---------- */
        const existingHotel = await prisma.hotel.findUnique({
            where: { slug: hotelSlug },
        });

        if (existingHotel) {
            return res.status(400).json({
                message: "Hotel slug already exists",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
            });
        }

        /* ---------- Fetch HOTEL_ADMIN Role ---------- */
        const hotelAdminRole = await prisma.role.findUnique({
            where: { name: "HOTEL_ADMIN" },
        });

        if (!hotelAdminRole) {
            return res.status(500).json({
                message: "HOTEL_ADMIN role not found",
            });
        }

        /* ---------- Password Hash ---------- */
        const passwordHash = await bcrypt.hash(password, 10);

        /* ---------- Transaction: Hotel + User ---------- */
        const result = await prisma.$transaction(async (tx) => {
            const hotel = await tx.hotel.create({
                data: {
                    name: hotelName,
                    slug: hotelSlug,
                },
            });

            const user = await tx.user.create({
                data: {
                    email: adminEmail,
                    passwordHash,
                    roleId: hotelAdminRole.id,
                    hotelId: hotel.id,
                },
            });

            return { hotel, user };
        });
        /* ---------- JWT ---------- */
        const payload = {
            userId: result.user.id,
            role: "HOTEL_ADMIN",
            hotelId: result.hotel.id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        /* ---------- Response ---------- */
        return res.status(200).json({
            token,
            user: {
                id: result.user.id,
                email: result.user.email,
                role: "HOTEL_ADMIN",
                hotelSlug: result.hotel.slug,
            },
        });
    }
    catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    };
}

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        /* ---------- Validation ---------- */
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        /* ---------- Find User ---------- */
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
                hotel: true,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        if (user.status !== "ACTIVE") {
            return res.status(401).json({
                message: "User is inactive",
            });
        }

        /* ---------- Password Check ---------- */
        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        /* ---------- JWT Payload ---------- */
        const payload = {
            userId: user.id,
            role: user.role.name,
            hotelId: user.hotel?.id || null,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        /* ---------- Response ---------- */
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role.name,
                hotelSlug: user.hotel?.slug || null,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
