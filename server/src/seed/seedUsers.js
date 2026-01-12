import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Seeding database...");

  /* ---------- ROLES ---------- */
  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: { name: "SUPER_ADMIN" },
  });

  const hotelAdminRole = await prisma.role.upsert({
    where: { name: "HOTEL_ADMIN" },
    update: {},
    create: { name: "HOTEL_ADMIN" },
  });

  /* ---------- HOTELS ---------- */
  const hotel1 = await prisma.hotel.upsert({
    where: { slug: "hotel-1" },
    update: {},
    create: {
      name: "Hotel One",
      slug: "hotel-1",
    },
  });

  const hotel2 = await prisma.hotel.upsert({
    where: { slug: "hotel-2" },
    update: {},
    create: {
      name: "Hotel Two",
      slug: "hotel-2",
    },
  });

  /* ---------- PASSWORD ---------- */
  const passwordHash = await bcrypt.hash("password123", 10);

  /* ---------- SUPER ADMINS ---------- */
  const superAdmins = [
    "admin1@hms.com",
    "admin2@hms.com",
    "admin3@hms.com",
  ];

  for (const email of superAdmins) {
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        passwordHash,
        roleId: superAdminRole.id,
      },
    });
  }

  /* ---------- HOTEL ADMINS ---------- */
  await prisma.user.upsert({
    where: { email: "hotel1@hms.com" },
    update: {},
    create: {
      email: "hotel1@hms.com",
      passwordHash,
      roleId: hotelAdminRole.id,
      hotelId: hotel1.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "hotel2@hms.com" },
    update: {},
    create: {
      email: "hotel2@hms.com",
      passwordHash,
      roleId: hotelAdminRole.id,
      hotelId: hotel2.id,
    },
  });

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
