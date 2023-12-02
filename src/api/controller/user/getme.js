const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getUserById(userId) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

module.exports = { getUserById };
