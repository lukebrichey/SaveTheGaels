import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import connectDB from './config/db.js'
import cors from 'cors';
import passport from 'passport';
import './config/passportConfig.js';
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

dotenv.config({ path: './.env' });

// Connect to DB
connectDB();   

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Express session
app.set('trust proxy', 1) // trust first proxy

const sessionSecret = process.env.SESSION_SECRET || process.env.DEVELOPMENT_SESSION_SECRET;

app.use(cookieParser(sessionSecret));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI || process.env.DEVELOPMENT_DATABASE_URI }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 1000 * 60 * 60
  }
}));

passportConfig(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('Server Got a Request!');
  console.log('Cookies:', req.cookies);
  console.log('Session:', req.session);
  console.log('Session Passport:', req.session.passport);
  // Check that req contains jwt token
  console.log('Headers:', req.headers);
  
  console.log('User:', req.user);
  console.log('isAuthenticated:', req.isAuthenticated());
  next();
});

// Define routes
import routes from './routes/routes.js'
import passportConfig from "./config/passportConfig.js";

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}
