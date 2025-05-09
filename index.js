const express = require("express");
const mongoose = require("mongoose");




const app  = express();
app.use(express.json());


const { userRouter  } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);


// this is  the right way to handel the mongo file this means that when the mongoose connect then after the port start
async function main(){
    await mongoose.connect("mongodb+srv://admin:admin05%40@cluster0.ntmjrlu.mongodb.net/coursera-app")
    app.listen(3000);
    console.log("listening on port 3000");
}


main()


