import express from "express"
import session from "express-session"
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
app.use(cors());

// Express session
app.set('trust proxy', 1) // trust first proxy

const sessionSecret = process.env.SESSION_SECRET || process.env.DEVELOPMENT_SESSION_SECRET;

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

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
