import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import pg from 'pg';
import env from 'dotenv';


const app = express();
const corsOption = { origin: 'http://localhost:3000' }
env.config();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use('/auth', authRoutes);



app.listen(8080, () => {
    console.log("Server started on port 8080");
})