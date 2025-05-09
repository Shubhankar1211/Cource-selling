const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { zod } = require("zod"); 
const { JWT_USER_SECRET } = require("../config")

userRouter.use(require("express").json());

userRouter.post("/signup",async function(req,res){
    // todo add zod
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const age = req.body.age

   const hashedUserPassword = await bcrypt.hash(password,10) 
   console.log(hashedUserPassword)

   // todo: put try/catch
    await userModel.create({
        email: email,
        password: hashedUserPassword,
        firstName: firstName,
        lastName: lastName,
        age: age
    })

    res.json({
        message : "you are signed up"
    })

})

userRouter.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email
    });
    console.log(user);

    const userPasswordMatch = await bcrypt.compare(password, user.password);
    if (userPasswordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_USER_SECRET);
        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
});


userRouter.get("/purchases",function(req,res){

})


module.exports = {
    userRouter : userRouter
}