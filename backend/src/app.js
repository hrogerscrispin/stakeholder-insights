import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dbConnection from './data/db.js';
import submissionRouter from './routes/submission_routes.js'

const app = express();
const PORT = process.env.PORT || 5000;


//stablishes the mongodb database connection
dbConnection();


//cross origin resource sharing -- enabled so I can Access via FRONT-END to this backend API.
app.use(cors());
app.use(express.json());


// get all submission stablished routes
app.use('/api/submissions', submissionRouter);

app.listen(PORT,()=>{
    console.log(`Server running on configured Port: ${PORT}`)
});