const mongoose = require("mongoose")
//console.log("connected to the mongo"); // this is ugly way to do it 
//mongoose.connect("mongodb+srv://admin:admin05%40@cluster0.ntmjrlu.mongodb.net/coursera-app")

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;





const userSchema = new Schema({
    email : String,
    password : String,
    firstName : String,
    lastName: String,
    age : Number
})


const adminSchema = new Schema({
    email : String,
    password : String,
    firstName : String,
    lastName : String,
    age : Number,
})


const courseSchema =new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId
    
})

const purchaseSchema  = new Schema({

    courseId : ObjectId,
    userId : ObjectId,

})


const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

module.exports = {
    userModel,
    adminModel, 
    courseModel, 
    purchaseModel, 
}

