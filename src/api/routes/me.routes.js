const express = require('express');
const passport = require('passport');
const { getUserById } = require('../controller/user/getme');

const router = express.Router();

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const userId = req.user.id;
      const user = await getUserById(userId);

      if (user) {
        console.log(`User ${user.name} is requesting their user data.`);
        res.json(user); // Renvoie l'objet utilisateur en JSON
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  }
);

module.exports = router;
