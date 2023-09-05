const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/register', async (req, res) => {
  const {
    firstName, lastName, username, email, password
  } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields!' });
  }

  const alreadyExistsUser = await prisma.user.findUnique({ where: { email } });

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'User with email already exists!' });
  }

  // create a user with prisma
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password
    }
  }).catch((err) => {
    console.log('Error: ', err);
    res.status(500).json({ error: 'Cannot register user at the moment!' });
  });

  if (newUser) res.json({ message: 'Thanks for registering' });
});

module.exports = router;
