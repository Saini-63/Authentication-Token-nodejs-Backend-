const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');
const bcrypt = require('bcrypt');
class UserController {

    static registerUser = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400);
                throw new Error("All fields are mandatory");
            }
            const userAvailable = await userModel.findOne({ email: email });
            if (userAvailable) {
                res.status(400);
                throw new Error("User already Registered");
            }
            //Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashed Password is ", hashedPassword);
            const user = await userModel.create({
                username: username,
                email: email,
                password: hashedPassword
            })
            console.log(`user is created ${user}`);
            if (user) {
                res.status(201).json({ _id: user.id, email: user.email });
            } else {
                res.status(400);
                throw new Error("User data is not valid");
            }

            //res.json({ message: "Register the user" });
        } catch (err) {
            console.log(err);
        }
    }

    static loginUser = (async (req, res) => {
        try{
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const user = await userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m"});
            res.status(200).json({ accessToken });
        } else{
            res.status(401);
            throw new Error("Email and password are not valid");
        }
        //res.json({ message: "Login  the user" });
    } catch(err){
        console.log(err);
    }
    })

    static currentUser = asynchandler(async (req, res) => {
        res.json(req.user);
    })

}

module.exports = UserController;