import express from 'express';
import pg from 'pg';
import env from 'dotenv';
import bcrypt from 'bcrypt';

import { Strategy as LocalStrategy, Strategy } from 'passport-local';
import session from 'express-session';
import passport from 'passport';

import db from
    "./db.js";
const router = express.Router();
const saltRounds = 10;
env.config();

router.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30, // Session expires after 30 minutes (in milliseconds)

    }

}));

router.use(passport.initialize());
router.use(passport.session());


class User {
    constructor(firstName, lastName, email, password, userName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userName = userName;
        this.id = 0;
    }

    async save() {
        try {
            const hash = await this.hashPassword(this.password);
            const query = `
                INSERT INTO users (fname, lname, email, password, user_name)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;
            `;
            const values = [
                this.firstName,
                this.lastName,
                this.email,
                hash,
                this.userName
            ];

            const result = await db.query(query, values);
            this.id = result.rows[0].id;
            return result.rows[0].id;
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, saltRounds);
    }
}

// Register route
router.post('/register', async (req, res) => {

    // console.log(user);

    try {
        const { firstName, lastName, email, password, confirmPassword, userName } = req.body.info;

        // Check if email already exists
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (checkResult.rowCount > 0) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords don't match!" });
        }

        const user = new User(firstName, lastName, email, password, userName);


        await user.save();

        req.login(user, (err) => {

            console.log(user);

            console.log("success");
            // go to home
        });

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});

// Login route using Passport.js

// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/secrets",
//     failureRedirect: "/login",
//   })
router.post('/login', (req, res, next) => {
    // console.log("THIS");
    // console.log(req.user);


    passport.authenticate('local', (err, user, info) => {


        if (err) {

            return res.status(500).json({ success: false, message: "An error occurred during authentication." });

        }
        // console.log(user);

        if (!user) {
            // console.log("THIS1");
            return res.status(401).json({ success: false, message: info.message });

        }

        req.login(user, (err) => {
            if (err) {

                return res.status(500).json({ success: false, message: "Failed to log in." });
            }


            // return res.redirect('/chats/1');
            // console.log("HERE");
            // console.log(user);


            return res.status(200).json({ success: true, message: "Login successful!" });


        });


    })(req, res, next);
});


// Home route (protected, only accessible when authenticated)
router.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to the home page!');
    } else {
        res.status(401).json({ success: false, message: "You need to log in to access this page." });
    }
});

// Passport.js Local Strategy setupimport { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(
    {
        usernameField: 'email', // Tell Passport that 'email' is the username field
        passwordField: 'password' // Ensure that 'password' is the field for password
    }
    ,
    async function verfiy(email, password, done) {
        // console.log(email, password);;

        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rowCount === 0) {

                return done(null, false, { message: 'Incorrect email.' });
            }

            const user = result.rows[0];
            // console.log("USER: " + user.id);

            const match = await bcrypt.compare(password, user.password);

            if (!match) {


                return done(null, false, { message: 'Incorrect password.' });
            }


            return done(null, user);
        } catch (err) {

            return done(err);
        }
    }
));

// passport.use(
//     "local" , 
//     new Strategy(async function  verfiy(email , password , cb) {

//     })
// )
// Serialize user into the session
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});


router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }

        res.status(201);//.json({ out: true });
    });
});
// letme do something
// tyring this
router.get('/test', (req, res) => {


    console.log("HEELO");

// testestestsetsetestestestsetse
    console.log(req.user);


    // res.redirect("http://localhost:3000/home");

    // res.status(201);
    // if (req.isAuthenticated()) {
    // res.json({ logged_in: true });
    // } else {
    //     res.json({ logged_in: false });
    // }
})

export default router;
