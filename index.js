require("dotenv").config()
const express=require('express')
const app=express()
const cors=require("cors")
const mongoose = require("mongoose");
const {logger}=require('./middleware/LogEvents')
const connectDB = require("./config/db_con");
const PORT = process.env.PORT || 3500;
const trackRouters=require('./routes/trackRoutes')
connectDB()

app.use(logger);
app.use(express.json());


app.use('/tracks',trackRouters)

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
  