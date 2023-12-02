const express = require('express');
const passport = require('passport');
const { getUserById } = require('../controller/user/getme');

const router = express.Router();

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await getUserById(userId);

      if (user) {
        res.send(`Your user name is: ${user.name}.`);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('An error occurred');
    }
  }
);

module.exports = router;
