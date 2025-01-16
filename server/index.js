const express = require("express");
const cors = require("cors");
const {connect}=require("./config/dbConnection")
const authRoutes = require("./routes/Auth");
const taskRoutes = require("./routes/Task")
const teamRoutes = require("./routes/Team");
const todoRoutes = require("./routes/Todo");
const profileRoutes = require("./routes/profile");
//server creation 
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// middleware to parse the req

app.use(express.json());


const PORT = process.env.PORT || 5000

//db connection
connect();


app.use(
    cors({ 
        origin:"*",  //for deployement;
        // origin:"http://localhost:3000",  //for development
        credentials:true,           
        optionSuccessStatus:200
    })
)

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/task",taskRoutes)
app.use("/api/v1/team",teamRoutes)
app.use("/api/v1/todo",todoRoutes)
app.use("/api/v1/profile",profileRoutes)

//listen to port
app.listen(PORT,()=>{
    console.log("Server is running at -->",PORT);
});
