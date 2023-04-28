import express from "express"
import session from "express-session"
import connectDB from './config/db.js'
import cors from 'cors';
import passport from 'passport';
import './config/passportConfig.js';
import config from './config/default.json' assert { type: "json" };

// Connect to DB
connectDB();   

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Express session
app.set('trust proxy', 1) // trust first proxy

const sessionSecret = config.sessionSecret;

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
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
