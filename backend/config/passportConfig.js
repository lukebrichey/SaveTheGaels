import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import User from '../models/user.js';

function passportConfig(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      try {
        const user = await User.findOne({ username: username });

        if (!user) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
          if (err) {
            return cb(err);
          }
          if (!crypto.timingSafeEqual(Buffer.from(user.hashedPassword, 'hex'), hashedPassword)) {
            return cb(null, false, { message: 'Incorrect username or password.' });
          }
          return cb(null, user);
        });
      } catch (err) {
        return cb(err);
      }
    })
  );
}
  
export default passportConfig;