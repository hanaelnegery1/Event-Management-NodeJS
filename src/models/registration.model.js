const prisma = require("../prisma");

async function create(eventId, name, email) {
  return prisma.$transaction(async (tx) => {
    const [event] = await tx.$queryRaw`
      SELECT capacity FROM events WHERE id = ${eventId} FOR UPDATE
    `;
    if (!event) return "notfound";

    const registered = await tx.registration.count({ where: { eventId } });
    if (registered >= event.capacity) return "full";

    try {
      await tx.registration.create({ data: { eventId, name, email } });
      return "ok";
    } catch (err) {
      if (err.code === "P2002") return "duplicate";
      throw err;
    }
  });
}

function findByEvent(eventId) {
  return prisma.registration.findMany({
    where: { eventId },
    select: { name: true, email: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
}

module.exports = { create, findByEvent };
