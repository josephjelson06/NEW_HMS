import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
