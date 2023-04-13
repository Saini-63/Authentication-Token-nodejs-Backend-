const express=require("express");
const router=require('./routes/contactRoutes');
const userRouter=require('./routes/userRoutes');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv=require("dotenv").config();

const app=express();
const port=process.env.PORT || 6000;
app.use(express.json());
connectDB();
app.use("/api/contacts", router);
app.use("/api/user", userRouter);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})