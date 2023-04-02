import express from "express"
import connectDB from './config/db.js'
import cors from 'cors';
import passport from 'passport';
;import { Strategy as LocalStrategy } from 'passport-local';


// Connect to DB
connectDB();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Define routes
import routes from './routes/blogs.js'

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
}) 
