const passport = require('passport');
const passportJwt = require('passport-jwt');

const { ExtractJwt } = passportJwt;
const StrategyJwt = passportJwt.Strategy;

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    ((jwtPayload, done) => prisma.user.findUnique({ where: { id: jwtPayload.id } })
      .then((user) => {
        user.password = undefined;
        done(null, user);
      })
      .catch((err) => done(err)))
  )
);
