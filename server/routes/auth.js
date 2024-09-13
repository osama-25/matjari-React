import express from 'express';
import pg from 'pg';
import env from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy, Strategy } from 'passport-local';
import session from 'express-session';
import passport from 'passport';

import db from
    "./db.js";
import next from 'next';
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


const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // const token = req.header('Authorization');


    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Bearer <token>'
    // console.log(token);


    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

// Home route (protected, only accessible when authenticated)
router.get('/home', verifyToken, (req, res) => {
    console.log(req.user);
    // res.send(`Welcome to the home page, user with ID: ${req.user.id}`);
    res.status(200).send("");

});
router.get('/test', verifyToken, (req, res) => {
    console.log(req.user.id);
    // res.send(`Welcome to the home page, user with ID: ${req.user.id}`);
    res.status(200);

});


// Register route
router.post('/register', async (req, res) => {
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

        // Save user and get the ID
        const userId = await user.save();

        // Fetch the user details to generate the token
        const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const registeredUser = result.rows[0];

        // Generate a token for the newly registered user

        const token = generateToken(registeredUser);


        // Now we can call verifyToken to simulate login behavior
     


        res.status(201).json({ success: true, token, message: "User registered successfully" });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});

// // Register route
// router.post('/register', async (req, res) => {

//     // console.log(user);

//     try {
//         const { firstName, lastName, email, password, confirmPassword, userName } = req.body.info;

//         // Check if email already exists
//         const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

//         if (checkResult.rowCount > 0) {
//             return res.status(400).json({ success: false, message: "Email already registered" });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ success: false, message: "Passwords don't match!" });
//         }

//         const user = new User(firstName, lastName, email, password, userName);

//         await user.save();

//         const token = generateToken(user);


//         res.status(201).json({ success: true, token, message: "User registered successfully" });



//         // res.status(201).json({ success: true, message: "User registered successfully" });
//     } catch (err) {
//         console.error("Error during registration:", err);
//         res.status(500).json({ success: false, message: "Error registering user" });
//     }
// });

// Login route using Passport.js

// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/secrets",
//     failureRedirect: "/login",
//   })
router.post('/login', (req, res, next) => {


    passport.authenticate('local', (err, user, info) => {


        if (err) {

            return res.status(500).json({ success: false, message: "An error occurred during authentication." });

        }
        // console.log(user);

        if (!user) {
            // console.log("THIS1");
            return res.status(401).json({ success: false, message: info.message });

        }
        const token = generateToken(user);
        console.log(token);

        res.status(200).json({ success: true, token, message: "Login successful!" });



    })(req, res, next);
});


// Home route (protected, only accessible when authenticated)
// router.get('/home', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.send('Welcome to the home page!');
//     } else {
//         res.status(401).json({ success: false, message: "You need to log in to access this page." });
//     }
// });

// Passport.js Local Strategy setupimport { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(
    {
        usernameField: 'email', // Tell Passport that 'email' is the username field
        passwordField: 'password' // Ensure that 'password' is the field for password
    }
    ,
    async function verify(email, password, done) {
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


// router.get('/logout', (req, res) => {
//     req.logout(err => {
//         if (err) {
//             return next(err);
//         }

//         res.status(201);//.json({ out: true });
//     });
// });
// letme do something
// tyring this
router.get('/test', verifyToken, (req, res) => {


    console.log(req.user.id);
    // res.send(`Welcome to the home page, user with ID: ${req.user.id}`);
    res.status(200);
    // res.redirect("http://localhost:3000/home");

    // res.status(201);
    // if (req.isAuthenticated()) {
    // res.json({ logged_in: true });
    // } else {
    //     res.json({ logged_in: false });
    // }
});

export default router;
