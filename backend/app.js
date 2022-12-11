import express from "express"
import connectDB from './config/db.js'

const app = express();
const port = 3000;

// Connect to DB
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
