const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { zod } = require("zod");
const {JWT_ADMIN_SECRET} = require("../config")

adminRouter.use(require("express").json()); 


adminRouter.post("/signup", async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const age = req.body.age

    const hashedAdminPassword = await bcrypt.hash(password, 10);
    console.log(hashedAdminPassword);

    await adminModel.create({
        email: email,
        password: hashedAdminPassword,
        firstName: firstName,
        lastName: lastName,
        age: age
    })


    res.json({
        mes: "you are signed up "
    })
})

adminRouter.post("/signin", async function (req, res) {
    const email = req.body.email
    const password = req.body.password

    const admin = await adminModel.findOne({
        email: email,
    })
    console.log(admin);

    const adminPasswordMatch = await bcrypt.compare(password, admin.password)
    if (adminPasswordMatch) {
        const token = jwt.sign({
            id : admin._id.toString()
        }, JWT_ADMIN_SECRET)
        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message : "Incorrect Credentials"
        })
    }

})





adminRouter.post("/course", function (req, res) {

})

adminRouter.delete("/deletecourse", function (req, res) {

})

adminRouter.put("/course", function (req, res) {

})

adminRouter.get("/course/bulk", function (req, res) {

})

module.exports = {
    adminRouter: adminRouter
}
