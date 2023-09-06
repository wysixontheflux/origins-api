const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/register', async (req, res) => {
  const {
    firstName, lastName, username, email, password
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
  }

  const alreadyExistsUser = await prisma.user.findUnique({ where: { email } });

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'Cet utilisateur est déjà inscrit !' });
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
    res.status(500).json({ error: 'Impossible de vous inscrire pour le moment' });
  });

  if (newUser) res.json({ message: 'Merci de votre inscription' });
});

module.exports = router;
