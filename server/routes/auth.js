import express from 'express';
import pg from "pg";
import env from "dotenv";
import fs from 'fs';
import { log } from 'console';
import bcrypt from 'bcrypt';
import axios from 'axios';
const router = express.Router();
env.config();

// var conn= new pg.Client({host:"matjari.postgres.database.azure.com", user:"matjari", password:"{@Ff12345}", database:"postgres", port:5432, ssl:{ca:fs.readFileSync("{ca-cert filename}")}});

// console.log(process.env.PGPASSWORD);

const db = new pg.Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('/Users/faisal/Dev/BaltimoreCyberTrustRoot.crt.pem')
    }

});
const saltRounds = 10;


db.connect();


router.post('/login', (req, res) => {
    console.log(req.body);
});

router.post('/register', async (req, res) => {

    // first checking if the email exsists then no need to register again
    const email = req.body.info.email;

    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);

    if (checkResult.rowCount > 0) {
        res.status(201).json({ success: true, message: "User registered successfully" });
        return;
    }


    // else take the data and insert it in the data base 
    const firstName = req.body.info.firstName;
    const lastName = req.body.info.lastName;
    const password = req.body.info.password;
    const confirm_password = req.body.info.confirm_password;
    const userName = req.body.info.userName;

    // TO-DO-YET: add regix to insure the data is correct 


    async function FetchData() {
        await db.query("insert into users (fname, lname , email, password , user_name) values ($1 , $2 , $3 , $4 , $5)", [
            firstName, lastName, email, hash, userName
        ]);
        db.end();
    }
    
    // Hashing the password and add the data
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.log("Error in Hasing password", err);
            res.status(500).json({ success: false, message: "Error registering user" });

        }
        else {
            try {
                FetchData();
                res.status(201).json({ success: true, message: "User registered successfully" });

            } catch (err) {
                console.log("Error with database 'INSERT INTO CODE'", err);
                res.status(500).json({ success: false, message: "Error registering user" });

            }
        }

    });

    res.status(201).json({ success: true, message: "User registered successfully" });


});
export default router;
