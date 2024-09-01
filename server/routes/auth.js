import express from 'express';
import pg from "pg";
// import env from "dotenv";

const router = express.Router();
// env.config();


// const db = new pg.Client({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
// });

// db.connect();


router.post('/login', (req, res) => {
    console.log(req.body);

});

router.post('/register', (req, res) => {
    console.log(req.body);
});
export default router;
