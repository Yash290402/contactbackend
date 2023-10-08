const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//description register a user
//route GET /api/users/register
//access public

const registerUser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("all field are required");
    }
    const userAvaiable = await User.findOne({ email });
    if (userAvaiable) {
        res.status(400);
        throw new Error("user is already registered");
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hash password is:" + hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });

    } else {
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({ message: "Register the user" });
});

//description login user
//route GET /api/users/login
//access public

const loginUser = asynchandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404);
        throw new Error("all filed are requied");
    }
    const user = await User.findOne({ email });

    //compare password with hash password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or passsword not valid");
    }


});


//description current user info 
//route GET /api/users/login
//access private

const currentUser = asynchandler(async (req, res) => {
    res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };