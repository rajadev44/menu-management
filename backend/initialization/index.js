const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initializeTimings = async () => {
  const days = [
    { id: 1, day: "Monday", hours: "", isOutOfService: false },
    { id: 2, day: "Tuesday", hours: "", isOutOfService: false },
    { id: 3, day: "Wednesday", hours: "", isOutOfService: false },
    { id: 4, day: "Thursday", hours: "", isOutOfService: false },
    { id: 5, day: "Friday", hours: "", isOutOfService: false },
    { id: 6, day: "Saturday", hours: "", isOutOfService: false },
    { id: 7, day: "Sunday", hours: "", isOutOfService: false },
  ];

  for (const timing of days) {
    await prisma.timing.upsert({
      where: { id: timing.id },
      update: {},
      create: timing,
    });
  }

  console.log("Initialization complete");
};

module.exports = {initializeTimings}