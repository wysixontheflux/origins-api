const express = require('express');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await prisma.user.findUnique({ where: { email } }).catch(
    (err) => {
      console.log('Error: ', err);
    }
  );

  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });
  }

  if (userWithEmail.password !== password) {
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });
  }

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.json({ message: 'Welcome Back!', token: jwtToken });
});

module.exports = router;
