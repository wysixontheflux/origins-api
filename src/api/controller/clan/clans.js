const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createClan(req, res) {
  const { name, leaderId } = req.body;

  try {
    const newClan = await prisma.clan.create({
      data: {
        name,
        leaderId,
        victories: 0,
        defeats: 0,
      },
    });

    res.status(201).json(newClan);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the clan', error: error.message });
  }
}

module.exports = {
  createClan,
};
