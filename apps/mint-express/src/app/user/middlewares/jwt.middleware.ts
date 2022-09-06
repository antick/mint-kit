import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../../../config';
import User from '../models/user.model';
import Token from '../models/token.model';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload, done) => {
  const user = await User.findById(payload.sub);
  const userTokens = await Token.find({ user: payload.sub, blacklisted: false });

  if (!user || !userTokens.length) {
    return done(null, false);
  }

  done(null, user);
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export {
  jwtStrategy
};
