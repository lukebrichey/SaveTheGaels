import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';

function passportConfig(passport) {
  console.log('Configuring passport');

  // JWT options
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.DEVELOPMENT_SESSION_SECRET,
  };

  // Define the JWT Strategy
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        // Find user by ID embedded in the token
        const user = await User.findById(jwtPayload.id);

        if (user) {
          console.log('JWT Authenticated user:', user);
          return done(null, user);
        } else {
          return done(null, false); // No user found
        }
      } catch (err) {
        console.error('Error during JWT authentication:', err);
        return done(err, false);
      }
    })
  );
}
  
export default passportConfig;