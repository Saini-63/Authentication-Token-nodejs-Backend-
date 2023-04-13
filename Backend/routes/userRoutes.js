const express = require("express");
const UserController=require('../controller/userController');
const validateToken = require("../middleware/validateTokenHandler");

const userRouter=express.Router();

userRouter.post("/register",UserController.registerUser);
userRouter.post("/login",UserController.loginUser);
userRouter.get("/current", validateToken, UserController.currentUser);

module.exports=userRouter;